import React, { Component } from "react";

/**
* @description Classe que lida com a renderização da lista de marcadores
*/
class ListaMarcadores extends Component {
	/**
	* @description Renderiza o conteúdo da aplicação da classe ListaMarcadores
	*/
	render() {
		const {
			marcadores,
			marcadorSelecionado,
			selecionarMarcador,
			isLateralToggled,
			updateQuery,
			query
		} = this.props;

		return (
			<aside className={isLateralToggled ? "sidebar-toggle" : "sidebar"}>
				<input
					type="text"
					className="entrada-filtro"
					placeholder="Filtre aqui... 🔎"
					value={query}
					onChange={(event) => updateQuery(event.target.value)}
				/>

				{marcadores.map((marcador, i) => (
					<div
						key={i}
						className={"sidebar-inner" + (marcadorSelecionado == marcador ? " selecionado" : "")}
						onClick={() => selecionarMarcador(marcador)}
					>
						<p>{marcador.nome}</p>
					</div>
				))}
			</aside>
		);
	};
};

export default ListaMarcadores;