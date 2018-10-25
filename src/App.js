import React, { Component } from 'react';
import './App.css';
import Mapa from "./Mapa.js"

class App extends Component {
	render() {
		return (
			<div className="app">
				<nav className="nav">
					<span className="botao">
						<a href="/">Mapa do Bairro</a>
					</span>
					<span className="hamburger">
						<a href="#" title="Mostrar/Esconder Barra lateral">☰</a>
					</span>
				</nav>
				<aside className="sidebar">
					<div className="sidebar-inner">
						Teste
					</div>
				</aside>
				<header className="mapa">
					<Mapa />
				</header>
			</div>
			);
	}
}

export default App;