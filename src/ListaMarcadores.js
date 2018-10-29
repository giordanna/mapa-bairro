import React, { Component } from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import escapeRegExp from "escape-string-regexp"
import sortBy from "sort-by"

class ListaMarcadores extends Component {

  static propTypes = {
    marcadores: PropTypes.array.isRequired,
    showMarcadorMapa: PropTypes.func.isRequired
  }

  state = {
    query: ""
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: "" })
  }

  render() {
    const { marcadores, showMarcadorMapa, isLateralToggled } = this.props
    const { query } = this.state

    let showingMarcadores
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      showingMarcadores = marcadores.filter((marcador) => match.test(marcador.titulo))
    } else {
      showingMarcadores = marcadores
    }

    showingMarcadores.sort(sortBy("titulo"))

    return (
      <aside className={isLateralToggled ? "sidebar-toggle" : "sidebar"}>
        <input
	        type="text"
	        className="entrada-filtro"
	        placeholder="Filtre aqui... 🔎"
	        value={query}
	        onChange={(event) => this.updateQuery(event.target.value)}
        />

		{showingMarcadores.map((marcador, i) => (
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