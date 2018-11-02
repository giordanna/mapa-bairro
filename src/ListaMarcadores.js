import React, { Component } from "react";

class ListaMarcadores extends Component {

	render() {
		const {
			marcadores,
			selecionarMarcador,
			isLateralToggled,
			updateQuery,
			query
		} = this.props

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
						className="sidebar-inner"
						onClick={() => selecionarMarcador(marcador)}
					>
						<p>{marcador.nome}</p>
					</div>
				))}
			</aside>
		)
	}
}

export default ListaMarcadores