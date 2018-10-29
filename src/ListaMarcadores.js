import React, { Component } from "react";
import PropTypes from "prop-types"

class ListaMarcadores extends Component {

  static propTypes = {
    marcadores: PropTypes.array.isRequired,
    showMarcadorMapa: PropTypes.func.isRequired
  }

  render() {
    const { marcadores, showMarcadorMapa, isLateralToggled, updateQuery, query } = this.props

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
				key={ i }
				className="sidebar-inner"
				onClick={() => showMarcadorMapa(marcador)}
			>
				<p>{marcador.titulo}</p>
			</div>
		))}
      </aside>
    )
  }
}

export default ListaMarcadores