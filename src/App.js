import React, { Component } from "react";
import "./App.css";
import Mapa from "./Mapa.js"
import * as MarcadoresAPI from "./utils/MarcadoresAPI"
import ListaMarcadores from "./ListaMarcadores.js"
import escapeRegExp from "escape-string-regexp"
import sortBy from "sort-by"

class App extends Component {
	state = {
		marcadores: [
			{ "titulo" : "abc1", "lat": -1.4513, "lng" : -48.4800 },
			{ "titulo" : "abc2", "lat": -1.4463, "lng" : -48.4810 },
			{ "titulo" : "abc3", "lat": -1.4423, "lng" : -48.4820 },
			{ "titulo" : "abc4", "lat": -1.4483, "lng" : -48.4830 },
		],
		isLateralToggled: false,
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

	render() {
		let showingMarcadores
	    if (this.state.query) {
	      const match = new RegExp(escapeRegExp(this.state.query), "i")
	      showingMarcadores = this.state.marcadores.filter((marcador) => match.test(marcador.titulo))
	    } else {
	      showingMarcadores = this.state.marcadores
	    }

	    showingMarcadores.sort(sortBy("titulo"))

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
				</nav>
				<ListaMarcadores
					query={this.state.query}
					updateQuery={this.updateQuery}
					isLateralToggled={this.state.isLateralToggled}
					showMarcadorMapa={this.showMarcadorMapa}
					marcadores={showingMarcadores}
				/>
				<Mapa
					isLateralToggled={this.state.isLateralToggled}
					marcadores={showingMarcadores}
				/>
			</div>
			)
	}
}

export default App