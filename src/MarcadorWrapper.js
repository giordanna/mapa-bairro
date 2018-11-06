import React from "react";
import { Marker, InfoWindow } from "react-google-maps";

/**
* @description Componente de auxílio do marcador para poder definir funções e estados individualmente
*/
const MarcadorWrapper = ({marcador,
	selecionarMarcador,
	deselecionarMarcador,
	marcadorSelecionado,
	abrirModalApp}) => {

	/**
	* @description Renderiza o conteúdo da aplicação da classe MarcadorWrapper
	*/
	return (
		<Marker
			animation={window.google.maps.Animation.DROP}
			icon={
				{
					url: marcadorSelecionado === marcador ?
					"http://maps.google.com/mapfiles/ms/icons/green-dot.png":
					"http://maps.google.com/mapfiles/ms/icons/red-dot.png"
				}
			}
			position={{ lat: marcador["location"]["lat"], lng: marcador["location"]["lng"] }}
			onClick={() => selecionarMarcador(marcador)}
		>
			{ marcadorSelecionado && marcadorSelecionado["id"] === marcador["id"] &&
				<InfoWindow onCloseClick={() => deselecionarMarcador()}>
					<div
						onClick={() => abrirModalApp()}
						className="infowindow"
					>
						<img
							className="imagem-infowindow"
							src={
								marcador["bestPhoto"]["prefix"] +
								"height250" +
								marcador["bestPhoto"]["suffix"]
							}
							alt={"Foto de " + marcador["name"]}
						/>
						<h2>{marcador["name"]}</h2>
						<p>
							{marcador["categories"][0]["name"]}
						</p>
						<p>
							{marcador["location"]["formattedAddress"][0]}
						</p>
						<p>Clique para mais detalhes!</p>
					</div>
				</InfoWindow>
			}
		</Marker>
	);
};

export default MarcadorWrapper;