import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListaMarcadores extends Component {
  static propTypes = {
    marcadores: PropTypes.array.isRequired,
    onDeleteMarcador: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { marcadores, onDeleteMarcador } = this.props
    const { query } = this.state

    let showingMarcadores
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingMarcadores = marcadores.filter((marcador) => match.test(marcador.name))
    } else {
      showingMarcadores = marcadores
    }

    showingMarcadores.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            to='/create'
            className='add-contact'
          >Add Contact</Link>
        </div>

        {showingMarcadores.length !== marcadores.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingMarcadores.length} of {marcadores.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingMarcadores.map((contact) => (
            <li key={marcador.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${marcador.avatarURL})`
              }}/>
              <div className='scontact-details'>
                <p>{marcador.name}</p>
                <p>{marcador.email}</p>
              </div>
              <button onClick={() => onDeleteMarcador(marcador)} className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListaMarcadores