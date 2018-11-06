import React from "react";
import MarcadorWrapper from "./MarcadorWrapper.js";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { compose } from "recompose";

/**
* @description Componente onde é renderizado o mapa do Google Maps e seus marcadores
*/
const MapaWrapper = compose(
	withScriptjs,
	withGoogleMap
)(props =>
	<GoogleMap
		clickableIcons={false}
		defaultZoom={15}
		defaultCenter={{ lat: -1.4413, lng: -48.4837 }}
		onClick={(event) => props.pesquisaFoursquare(event.latLng, props.addLista, props.abrirModal)}
	>

	{props.marcadores.map((marcador, i) => (
		<MarcadorWrapper
			key={i}
			marcador={marcador}
			selecionarMarcador={props.selecionarMarcador}
			marcadorSelecionado={props.marcadorSelecionado}
			deselecionarMarcador={props.deselecionarMarcador}
			abrirModalApp={props.abrirModalApp}
		/>
	))}

	</GoogleMap>
);

export default MapaWrapper;