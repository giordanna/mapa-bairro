import React, { Component } from 'react';
import './App.css';
import Mapa from "./Mapa.js"
import * as MarcadoresAPI from './utils/MarcadoresAPI'

class App extends Component {
	state = {
		marcadores: []
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

	render() {
		return (
			<div className="app">
				<nav className="nav">
					<span className="botao">
						<a href="/">Mapa do Umarizal</a>
					</span>
					<span className="hamburger">
						<a href="#" title="Mostrar/Esconder Barra lateral">☰</a>
					</span>
				</nav>
				<aside className="sidebar">
					<input type="text" className="entrada-filtro" placeholder="Filtre aqui... 🔎" />
					<div className="sidebar-inner">
						Teste
					</div>
					<div className="sidebar-inner">
						Teste
					</div>
					<div className="sidebar-inner">
						Teste
					</div>
					<div className="sidebar-inner">
						Teste
					</div>
				</aside>
				<main className="mapa">
					<Mapa />
				</main>
			</div>
			)
	}
}

export default App