import React, { Component } from "react";
import "./App.css";
import Mapa from "./Mapa.js"
import * as MarcadoresAPI from "./utils/MarcadoresAPI"
import ListaMarcadores from "./ListaMarcadores.js"
import escapeRegExp from "escape-string-regexp"

class App extends Component {
	state = {
		marcadores: [
			  {
			    "nome": "Porpino Burger",
			    "endereco": "Jerônimo Pimentel, 242",
			    "lat": -1.442430694656103,
			    "lng": -48.488064103178374
			  },
			  {
			    "nome": "Roxy Bar",
			    "endereco": "Av. Senador Lemos, 231",
			    "lat": -1.4412027502407205,
			    "lng": -48.489757776260376
			  },
			  {
			    "nome": "Cia. Paulista de Pizza",
			    "endereco": "Av. Visc. de Souza Franco, 559",
			    "lat": -1.443236819183104,
			    "lng": -48.48991106226811
			  },
			  {
			    "nome": "D'Opará",
			    "endereco": "Av. Sen. Lemos",
			    "lat": -1.4421665904806702,
			    "lng": -48.48984166720438
			  },
			  {
			    "nome": "Armazém Belém",
			    "endereco": "Boulevard Shopping (Piso 1, Lj. 163)",
			    "lat": -1.4456159017835408,
			    "lng": -48.489071420094675
			  },
			  {
			    "nome": "Cairu",
			    "endereco": "Boulevard Shopping (Piso 4, Lj. 412)",
			    "lat": -1.445670539090734,
			    "lng": -48.48890663650532
			  }
		],
		isLateralToggled: false,
		marcadorSelecionado: null,
		query: ""
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
		MarcadoresAPI.create(marcador).then(marcador => {
			this.setState(state => ({
				marcadores: state.marcadores.concat([ marcador ])
			}))
		})
	}

	toggleLateral() {
		this.setState({ isLateralToggled: !this.state.isLateralToggled })
	}

	mostrarAbout() {
		alert("Feito com React, Google Maps e Yelp")
	}

	selecionarMarcador = (marcador) => {
		this.setState({ marcadorSelecionado: marcador })
		alert(marcador["nome"])
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
					<span className="botao">
						<a
							onClick={() => this.mostrarAbout()}
						>Sobre</a>
					</span>
					<span className="hamburger">
						<a
							title="Mostrar/Esconder Barra lateral"
							onClick={() => this.toggleLateral()}
						>
							☰
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
				/>
			</div>
			)
	}
}

export default App