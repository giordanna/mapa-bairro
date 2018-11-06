import React, { Component } from "react";
import MapaWrapper from "./MapaWrapper.js";
import request from "request";
import Modal from "react-responsive-modal";

/**
* @description Classe do mapa onde é passado alguns props e definido alguns estados
*/
class Mapa extends Component {

	state = {
		modalOpen: false,
		possiveisLocais: []
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
		this.setState({ modalOpen: false });
	};

	/**
	* @description Altera o estado da lista com o parâmetro dado
	* @param {Object} lista - lista com os locais capturados pela pesquisa no Foursquare
	*/
	addLista = (lista) => {
		this.setState({ possiveisLocais: lista });
	};
	
	/**
	* @description Utiliza a API do Foursquare para pesquisar os locais da área clicada
	* @param {Object} location - Latitude e longitude clicada pelo usuário
	* @param {function} addLista - Função para atualizar lista dos locais pesquisados
	* @param {function} abrirModal - Função para abrir o modal com os locais descobertos 
	*/
	pesquisaFoursquare = (location, addLista, abrirModal) => {
		let lista = [];

		// início do trecho de pesquisa do Foursquare
		request({
			url: "https://api.foursquare.com/v2/venues/explore",
			method: "GET",
			qs: {
				client_id: "DFT4IMWTELLO00IVL3AHBOBW45LRBGO0D34SY14E155LUCBK",
				client_secret: "FT25LN2Q2LAI0KMPSY5YEACTC0X2DFXCQKNKB1TQTYLLQ3NC",
				ll: location.lat() + "," + location.lng(),
				v: "20180323"
			}
		}, function(err, res, body) {
			if (err) {
				console.error(err);
			} else if (JSON.parse(body)["meta"]["code"] === 429) {
				// trata o erro de caso tenha sido atingido o limite de requisições
				console.error(JSON.parse(body)["meta"]["errorDetail"]);
				lista = [
					{
						"id" : "erro",
						"nome": "Erro: não foi possível recuperar",
						"endereco": "Se você estiver vendo isso, provavelmente o limite de requisições foi atingido. Aguarde um dia."
					}
				];
			} else {
				let corpo = JSON.parse(body);
				if (corpo["response"]["groups"][0]["items"]) {
					// primeiro ordena do mais próximo ao mais distante da distância dada pelo usuário
					lista = corpo["response"]["groups"][0]["items"]
						.sort((item_a, item_b) =>
							item_a["venue"]["location"]["distance"] - item_b["venue"]["location"]["distance"])
						.map((item) => (
							{
								"id" : item["venue"]["id"],
								"nome": item["venue"]["name"],
								"endereco": item["venue"]["location"]["address"],
								"categoria": item["venue"]["categories"][0]["name"]
							}
						));
					// fim do trecho de pesquisa do Foursquare

					addLista(lista);
					abrirModal();
				}
			}
		});
	};

	/**
	* @description Utiliza a API do Foursquare buscar mais informações do local escolhido
	* @param {Object} marcador - Marcador escolhido
	* @param {function} createMarcador - Função adicionar o marcador no estado da aplicação
	*/
	buscarDetalhes = (marcador, createMarcador) => {
		if (marcador.id !== "erro") {
			// início do trecho de pesquisa do Foursquare
			request({
				url: "https://api.foursquare.com/v2/venues/" + marcador["id"],
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
				} else {
					let corpo = JSON.parse(body);
					marcador = corpo["response"]["venue"];
				}
				// fim do trecho de pesquisa do Foursquare

				createMarcador(marcador);
			});
		}
	};

	/**
	* @description Renderiza o conteúdo da aplicação da classe Mapa
	*/
	render() {
		const {
			isLateralToggled,
			marcadores,
			selecionarMarcador,
			deselecionarMarcador,
			createMarcador,
			marcadorSelecionado,
			abrirModalApp
		} = this.props;

		return (
			<main className={isLateralToggled ? "mapa-toggle" : "mapa"}>
				<MapaWrapper
					pesquisaFoursquare={this.pesquisaFoursquare}
					selecionarMarcador={selecionarMarcador}
					deselecionarMarcador={deselecionarMarcador}
					marcadores={marcadores}
					marcadorSelecionado={marcadorSelecionado}
					abrirModal={this.abrirModal}
					abrirModalApp={abrirModalApp}
					addLista={this.addLista}
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDk9y-BWlt1u5klFVBGxWocj2DnHV_e9k&libraries=geometry,drawing,places"
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `100%` }} />}
					mapElement={<div style={{ height: `100%` }} />}
				/>

				<div>
					<Modal
						open={this.state.modalOpen}
						onClose={this.fecharModal}
						center
					>
						<h2>Escolha o local que você gostaria de adicionar:</h2>
						{this.state.possiveisLocais.map((local, i) => (
							<div key={i}>
								<div
									className="local-escolher"
									onClick={() => {this.buscarDetalhes(local, createMarcador); this.fecharModal()}}
								>
									<h3>{local["nome"]}</h3>
									<p>
										<strong>Categoria: </strong>
										{local["categoria"]}
									</p>
									<p>
										<strong>Endereço: </strong>
										{local["endereco"]}
									</p>
								</div>
								<hr />
							</div>
						))}
					</Modal>
				</div>
			</main>
		);
	};
};

export default Mapa;