import React, { Component } from "react";
import "./App.css";
import "./react-notifications.css";
import Mapa from "./Mapa.js";
import ListaMarcadores from "./ListaMarcadores.js";
import escapeRegExp from "escape-string-regexp";
import Modal from "react-responsive-modal";
import request from "request";
import {NotificationContainer, NotificationManager} from "react-notifications";

/**
* @description Classe principal da aplicação
*/
class App extends Component {
	state = {
		marcadores: [],
		isLateralToggled: false,
		marcadorSelecionado: null,
		query: "",
		modalOpen: false
	};

	/**
	* @description Função para realizar operações depois que a aplicação é renderizada
	*/
	componentDidMount() {

		let ids = [
			"5572f58a498eef85adf4f1b4",
			"4c310017ac0ab71342201c1e",
			"4d95fca8daec224bf29d0b3e",
			"4eb732a9991165b76327d02e",
			"4bd074c841b9ef3ba113fae5"
		];

		let marcadoresIniciais = [];

		ids.map((id) => {
			// início do trecho de pesquisa do Foursquare
			request({
				url: "https://api.foursquare.com/v2/venues/" + id,
				method: "GET",
				qs: {
					client_id: "DFT4IMWTELLO00IVL3AHBOBW45LRBGO0D34SY14E155LUCBK",
					client_secret: "FT25LN2Q2LAI0KMPSY5YEACTC0X2DFXCQKNKB1TQTYLLQ3NC",
					v: "20180323"
				}
			}, function(err, res, body) {
				if (err) {
					console.error(err);
				} else if (JSON.parse(body)["meta"]["code"] === 429) {
					// trata o erro de caso tenha sido atingido o limite de requisições
					console.error(JSON.parse(body)["meta"]["errorDetail"]);
					NotificationManager.error("Houve um problema ao tentar recuperar informações do local", "Erro");
				} else {
					let corpo = JSON.parse(body);
					marcadoresIniciais.push(corpo["response"]["venue"]);
				}
			});
			// fim do trecho de pesquisa do Foursquare
		});

		// evita um probleminha de renderização no início
		// TODO: conseguir envolver essa tarefa em um promise para
		// poder usar o then()
		setTimeout(() => {
			this.setState({
				marcadores: marcadoresIniciais
			});
		}, 6000);
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
			showingMarcadores = this.state.marcadores.filter((marcador) => match.test(marcador["name"]));
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
								<h2>{this.state.marcadorSelecionado["name"]}</h2>
								<p>
									<strong>Categoria: </strong>
									{this.state.marcadorSelecionado["categories"][0]["name"]}
								</p>
								{this.state.marcadorSelecionado["tips"] && 
								<p>
									<strong>Top comentário: </strong>
									<em>
										{
											this.state.marcadorSelecionado["tips"]["groups"][0]["items"][0]["text"]
										}
									</em> - por {" "}
									<a
										target="_blank"
										className="link"
										href={this.state.marcadorSelecionado["tips"]["groups"][0]["items"][0]["canonicalUrl"]}
									>
										{
											this.state.marcadorSelecionado["tips"]["groups"][0]["items"][0]["user"]["firstName"]
										}
									</a>
								</p>
								}
								{this.state.marcadorSelecionado["price"] && 
								<p>
									<strong>Preço: </strong>
									{
										"💵 " + this.state.marcadorSelecionado["price"]["message"]
									}
								</p>
								}
								<p>
									<strong>Avaliação: </strong>
									{
										"⭐ " + this.state.marcadorSelecionado["rating"]
									}
								</p>
								<p>
									<strong>Curtidas: </strong>
									{
										"👍 " + this.state.marcadorSelecionado["likes"]["count"]
									}
								</p>
								<p>
									<strong>Endereço: </strong>
									{	"📍 " + this.state.marcadorSelecionado["location"]["formattedAddress"][0] +  " - " +
										this.state.marcadorSelecionado["location"]["formattedAddress"][1]
									}
								</p>
								<p>
									<strong>
										<a
											target="_blank"
											className="link"
											href={this.state.marcadorSelecionado["canonicalUrl"]}
										>
											Veja mais no Foursquare
										</a>
									</strong>
								</p>
								<a
									className="botao-apagar"
									onClick={() => {this.removeMarcador(this.state.marcadorSelecionado); this.fecharModal()}}
								>
									Apagar
								</a>
								<img
									className="imagem"
									src={
										this.state.marcadorSelecionado["bestPhoto"]["prefix"] +
										"height500" +
										this.state.marcadorSelecionado["bestPhoto"]["suffix"]
									}
									alt={"Foto de " + this.state.marcadorSelecionado["name"]}
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