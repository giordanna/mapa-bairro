import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, FaAnchor, Paper, Typography } from "react-google-maps"
import { compose, withProps, withStateHandlers } from "recompose"
// https://tomchentw.github.io/react-google-maps/

const MyMapComponent = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: -1.4413, lng: -48.4837 }}
  >

    {props.marcadores.map((marcador, i) => (
       <MarcadorWrapper
        key={i}
        marcador={marcador}
       />
    ))}

  </GoogleMap>
)

class MarcadorWrapper extends Component {
  constructor() {
        super()
        this.state = {
            isOpen: false
        }
        this.onToggleOpen = this.onToggleOpen.bind(this)
    }

    onToggleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
      const { marcador } = this.props
      return (
        <Marker
          position={{ lat: marcador.lat, lng: marcador.lng }}
          onClick={this.onToggleOpen}
        >

        { this.state.isOpen &&
          <InfoWindow
            onCloseClick={this.onToggleOpen}
          >
            <h1 className="info">{marcador.titulo}</h1>
          </InfoWindow>
        }
        </Marker>
    )
  }
}

class Mapa extends Component {

    render() {
        const { isLateralToggled, marcadores } = this.props
        return (
            <main className={isLateralToggled ? "mapa-toggle" : "mapa"}>
                <MyMapComponent
                    marcadores={marcadores}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDk9y-BWlt1u5klFVBGxWocj2DnHV_e9k&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </main>
        )
    }
}

export default Mapa