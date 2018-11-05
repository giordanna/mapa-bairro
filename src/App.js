import React, { Component } from "react";
import "./App.css";
import "./react-notifications.css";
import Mapa from "./Mapa.js";
import ListaMarcadores from "./ListaMarcadores.js";
import escapeRegExp from "escape-string-regexp";
import Modal from "react-responsive-modal";
import {NotificationContainer, NotificationManager} from "react-notifications";

/**
* @description Classe principal da aplicação
*/
class App extends Component {
	state = {
		marcadores: [
			{
				"id": "5572f58a498eef85adf4f1b4",
				"nome": "Porpino Burger",
				"endereco": "Jerônimo Pimentel, 242",
				"lat": -1.442430694656103,
				"lng": -48.488064103178374,
				"categoria": "Hamburgueria",
				"img": "https://fastly.4sqi.net/img/general/width960/21789324_2E9_KjuF0gbEvyXpKZECwylJ46jlHXdoiOVD3EzDLDg.jpg"
			},
			{
				"id":   "4c310017ac0ab71342201c1e",
				"nome": "Roxy Bar",
				"endereco": "Av. Senador Lemos, 231",
				"lat": -1.4412027502407205,
				"lng": -48.489757776260376,
				"categoria": "Restaurante Brasileiro",
				"img": "https://fastly.4sqi.net/img/general/width540/rOzIJJ-OZof180f5osQ6wIkPz0nSYlWgfTRZidmsV-k.jpg"
			},
			{
				"id": "4d95fca8daec224bf29d0b3e",
				"nome": "Cia. Paulista de Pizza",
				"endereco": "Av. Visc. de Souza Franco, 559",
				"lat": -1.443236819183104,
				"lng": -48.48991106226811,
				"categoria": "Pizzaria",
				"img": "https://fastly.4sqi.net/img/general/width720/ui_jo7sFhPgq4hrexbiDdouwf_l-3H4skjAUWadUQ4A.jpg"
			},
			{
				"id": "4eb732a9991165b76327d02e",
				"nome": "D'Opará",
				"endereco": "Av. Sen. Lemos",
				"lat": -1.4421665904806702,
				"lng": -48.48984166720438,
				"categoria": "Bar",
				"img": "https://fastly.4sqi.net/img/general/width720/32543379__rH7XAvKtJxn1zqDXEcMA9r0gvBWOnpjJFXdZhBxmww.jpg"
			},
			{
				"id": "4bd074c841b9ef3ba113fae5",
				"nome": "Cairu",
				"endereco": "Boulevard Shopping (Piso 4, Lj. 412)",
				"lat": -1.445670539090734,
				"lng": -48.48890663650532,
				"categoria": "Sorveteria",
				"img": "https://fastly.4sqi.net/img/general/width720/6311225_UWZLEqh5eRLIDSLeRnphkSDKU-c3SQnMsWFDTdHgeMA.jpg"
			}
		],
		isLateralToggled: false,
		marcadorSelecionado: null,
		query: "",
		modalOpen: false
	};
	
	/**
	* @description Atualiza o estado da query para refletir no componente de lista de marcadores
	* @param {string} query - Entrada do usuário de filtro
	*/
	updateQuery = (query) => {
		this.setState({ query: query.trim() });
	};
	
	/**
	* @description Atualiza o estado de marcadores, removendo o marcador indicado pelo parâmetro
	* @param {Object} marcador - Marcador selecionado pelo usuário
	*/
	removeMarcador = (marcador) => {
		this.setState((state) => ({
			marcadores: state.marcadores.filter((c) => c.id !== marcador.id)
		}));
		NotificationManager.success("O marcador foi deletado!", "Sucesso!");
	};
	
	/**
	* @description Atualiza o estado de marcadores, adicionando o marcador indicado pelo parâmetro
	* @param {Object} marcador - Marcador selecionado pelo usuário
	*/
	createMarcador = (marcador) => {
		this.setState(state => ({
			marcadores: state.marcadores.concat( [marcador] )
		}));
		NotificationManager.success("O marcador foi criado!", "Sucesso!");
	};
	
	/**
	* @description Alterna o estado da barra lateral entre esconder e mostrar
	*/
	toggleLateral() {
		this.setState({ isLateralToggled: !this.state.isLateralToggled });
	};
	
	/**
	* @description Altera o estado de marcador selecionado pelo indicado pelo parâmetro
	* @param {Object} marcador - Marcador selecionado pelo usuário
	*/
	selecionarMarcador = (marcador) => {
		this.setState({ marcadorSelecionado: marcador });
	};

	/**
	* @description Altera o estado de marcador selecionado para nulo
	*/
	deselecionarMarcador = () => {
		this.setState({ marcadorSelecionado: null });
	};
	
	/**
	* @description Altera o estado do modal para aberto
	*/
	abrirModal = () => {
		this.setState({ modalOpen: true });
	};

	/**
	* @description Altera o estado do modal para fechado
	*/
	fecharModal = () => {
		this.setState({ modalOpen: false, marcadorSelecionado: null });
	};
	
	/**
	* @description Mostra informações sobre a aplicação
	*/
	mostrarSobre = () => {
		NotificationManager.info("2018 © Giordanna De Gregoriis. Feito com React, usando a API do Google Maps e Foursquare", "Sobre", 6000);
	};
	
	/**
	* @description Renderiza o conteúdo da aplicação da classe App
	*/
	render() {
		// início do trecho onde é realizado o filtro de marcadores
		let showingMarcadores;
		
		if (this.state.query) {
			const match = new RegExp(escapeRegExp(this.state.query), "i");
			showingMarcadores = this.state.marcadores.filter((marcador) => match.test(marcador.nome));
		} else {
			showingMarcadores = this.state.marcadores;
		}
		// final do trecho onde é realizado o filtro de marcadores

		return (
			<div className="app">
				<nav className="nav">
					<span className="botao">
						<a href="/">Mapa do Umarizal</a>
					</span>
					<span className="botao-direita">
						<a
							title="Mostrar/Esconder Barra lateral"
							onClick={() => this.toggleLateral()}
						>
							☰
						</a>
					</span>
					<span className="botao-direita">
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
					deselecionarMarcador={this.deselecionarMarcador}
					marcadorSelecionado={this.state.marcadorSelecionado}
					createMarcador={this.createMarcador}
					abrirModalApp={this.abrirModal}
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