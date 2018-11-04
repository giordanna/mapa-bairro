import React, { Component } from "react";
import "./App.css";
import "./react-notifications.css";
import Mapa from "./Mapa.js";
import * as MarcadoresAPI from "./utils/MarcadoresAPI";
import ListaMarcadores from "./ListaMarcadores.js";
import escapeRegExp from "escape-string-regexp";
import Modal from "react-responsive-modal";
import {NotificationContainer, NotificationManager} from "react-notifications";

class App extends Component {
	state = {
		marcadores: [],
		isLateralToggled: false,
		marcadorSelecionado: null,
		query: "",
		modalOpen: false
	};

	componentDidMount() {
		MarcadoresAPI.getAll().then((marcadores) => {
			this.setState({ marcadores });
		});
	};

	updateQuery = (query) => {
		this.setState({ query: query.trim() });
	};

	removeMarcador = (marcador) => {
		this.setState((state) => ({
			marcadores: state.marcadores.filter((c) => c.id !== marcador.id)
		}));
		MarcadoresAPI.remove(marcador);
		NotificationManager.success("O marcador foi deletado!", "Sucesso!");
	};

	createMarcador = (marcador) => {
		MarcadoresAPI.create(marcador).then(marcador => {
			this.setState(state => ({
				marcadores: state.marcadores.concat( [marcador] )
			}));
		});
		NotificationManager.success("O marcador foi criado!", "Sucesso!");
	};

	toggleLateral() {
		this.setState({ isLateralToggled: !this.state.isLateralToggled });
	};

	selecionarMarcador = (marcador) => {
		this.setState({ marcadorSelecionado: marcador });
		this.abrirModal();
	};

	abrirModal = () => {
		this.setState({ modalOpen: true });
	};

	fecharModal = () => {
		this.setState({ modalOpen: false });
	};

	mostrarSobre = () => {
		NotificationManager.info("2018 © Giordanna De Gregoriis. Feito com React, usando a API do Google Maps e Foursquare", "Sobre", 6000);
	};

	render() {
		let showingMarcadores;

		if (this.state.query) {
			const match = new RegExp(escapeRegExp(this.state.query), "i");
			showingMarcadores = this.state.marcadores.filter((marcador) => match.test(marcador.nome));
		} else {
			showingMarcadores = this.state.marcadores;
		}

		return (
			<div className="app">
				<nav className="nav">
					<span className="botao">
						<a href="/">Mapa do Umarizal</a>
					</span>
					<span className="hamburger">
						<a
							title="Mostrar/Esconder Barra lateral"
							onClick={() => this.toggleLateral()}
						>
							☰
						</a>
					</span>
					<span className="hamburger">
						<a
							onClick={this.mostrarSobre}
						>
							Sobre
						</a>
					</span>
				</nav>

				<ListaMarcadores
					query={this.state.query}
					updateQuery={this.updateQuery}
					isLateralToggled={this.state.isLateralToggled}
					marcadores={showingMarcadores}
					selecionarMarcador={this.selecionarMarcador}
					marcadorSelecionado={this.state.marcadorSelecionado}
				/>

				<Mapa
					isLateralToggled={this.state.isLateralToggled}
					marcadores={showingMarcadores}
					selecionarMarcador={this.selecionarMarcador}
					marcadorSelecionado={this.state.marcadorSelecionado}
					createMarcador={this.createMarcador}
				/>

				<div>
					<Modal open={this.state.modalOpen} onClose={this.fecharModal} center>
						{this.state.marcadorSelecionado &&
							<div>
								<h2>{this.state.marcadorSelecionado["nome"]}</h2>
								<p>
									<strong>Categoria: </strong>
									{this.state.marcadorSelecionado["categoria"]}
								</p>
								<p>
									<strong>Endereço: </strong>
									{this.state.marcadorSelecionado["endereco"]}
								</p>
								<a
									className="botao-apagar"
									onClick={() => {this.removeMarcador(this.state.marcadorSelecionado); this.fecharModal()}}
								>
									Apagar
								</a>
								<img
									className="imagem"
									src={this.state.marcadorSelecionado["img"]}
									alt={"Foto de " + this.state.marcadorSelecionado["titulo"]}
								/>
							</div>
						}
					</Modal>
				</div>

				<NotificationContainer/>
			</div>
		);
	};
};

export default App;