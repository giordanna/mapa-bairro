import React, { Component } from "react";
import "./App.css";
import Mapa from "./Mapa.js"
import * as MarcadoresAPI from "./utils/MarcadoresAPI"
import ListaMarcadores from "./ListaMarcadores.js"
import escapeRegExp from "escape-string-regexp"
import Modal from "react-responsive-modal"
import request from "request"

class App extends Component {
	state = {
		marcadores: [],
		isLateralToggled: false,
		marcadorSelecionado: null,
		query: "",
		modalOpen: false
	}

	componentDidMount() {
		MarcadoresAPI.getAll().then((marcadores) => {
			this.setState({ marcadores })
		})
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	removeMarcador = (marcador) => {
		this.setState((state) => ({
			marcadores: state.marcadores.filter((c) => c.id !== marcador.id)
		}))

		MarcadoresAPI.remove(marcador)
	}

	createMarcador(marcador) {
		request({
			url: "https://api.foursquare.com/v2/venues/" + marcador["id"] + "/photos",
			method: "GET",
			qs: {
				client_id: "DFT4IMWTELLO00IVL3AHBOBW45LRBGO0D34SY14E155LUCBK",
				client_secret: "FT25LN2Q2LAI0KMPSY5YEACTC0X2DFXCQKNKB1TQTYLLQ3NC",
				v: "20180323",
				"limit": "1"
			}
		}, function(err, res, body) {
			if (err) {
				console.error(err);
			} else if (JSON.parse(body)["meta"]["code"] == 429) {
				console.error(JSON.parse(body)["meta"]["errorDetail"]);
			} else {
				let corpo = JSON.parse(body)
				marcador["img"] = corpo["response"]["photos"]["items"][0]["prefix"]
				+
				"width"
				+
				corpo["response"]["photos"]["items"][0]["width"]
				+
				corpo["response"]["photos"]["items"][0]["suffix"]
			}
			MarcadoresAPI.create(marcador).then(marcador => {
				this.setState(state => ({
					marcadores: state.marcadores.push( marcador )
				}))
			})
		})

		
	}

	toggleLateral() {
		this.setState({ isLateralToggled: !this.state.isLateralToggled })
	}

	mostrarAbout() {
		alert("Feito com React, Google Maps e Foursquare")
	}

	selecionarMarcador = (marcador) => {
		this.setState({ marcadorSelecionado: marcador })
		this.abrirModal()
	}

	abrirModal = () => {
		this.setState({ modalOpen: true })
	}

	fecharModal = () => {
		this.setState({ modalOpen: false })
	}

	render() {
		let showingMarcadores

		if (this.state.query) {
			const match = new RegExp(escapeRegExp(this.state.query), "i")
			showingMarcadores = this.state.marcadores.filter((marcador) => match.test(marcador.nome))
		} else {
			showingMarcadores = this.state.marcadores
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
							onClick={this.mostrarAbout}
						>Sobre</a>
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
									onClick={() => {this.removeMarcador(this.state.marcadorSelecionado); this.fecharModal() }}
								>
									Apagar
								</a>
								<img
									className="imagem"
									src={this.state.marcadorSelecionado["img"]}
								/>
							</div>
						}
					</Modal>
				</div>
			</div>
		)
	}
}

export default App