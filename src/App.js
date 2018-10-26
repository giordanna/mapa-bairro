import React, { Component } from 'react';
import './App.css';
import Mapa from "./Mapa.js"
import * as MarcadoresAPI from './utils/MarcadoresAPI'
import ListaMarcadores from "./ListaMarcadores.js"

class App extends Component {
	state = {
		marcadores: [],
		isLateralToggled: false
	}
	componentDidMount() {
		MarcadoresAPI.getAll().then((marcadores) => {
			this.setState({ marcadores })
		})
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
				contacts: state.marcadores.concat([ marcador ])
			}))
		})
	}

	showMarcadorMapa(marcadir) {

	}

	toggleLateral() {
		this.setState({ isLateralToggled: !this.state.isLateralToggled })
	}

	render() {
		return (
			<div className="app">
				<nav className="nav">
					<span className="botao">
						<a href="/">Mapa do Umarizal</a>
					</span>
					<span className="hamburger">
						<a
							href="#"
							title="Mostrar/Esconder Barra lateral"
							onClick={() => this.toggleLateral()}
						>
							☰
						</a>
					</span>
				</nav>
				<ListaMarcadores
					isLateralToggled={this.state.isLateralToggled}
					showMarcadorMapa={this.showMarcadorMapa}
					marcadores={this.state.marcadores}
				/>
				<Mapa
					isLateralToggled={this.state.isLateralToggled}
				/>
			</div>
			)
	}
}

export default App