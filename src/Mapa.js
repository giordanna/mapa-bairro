import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, FaAnchor, Paper, Typography } from "react-google-maps"
import { compose, withProps, withStateHandlers } from "recompose"
import request from "request"

// https://tomchentw.github.io/react-google-maps/

const MyMapComponent = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    clickableIcons={false}
    defaultZoom={15}
    defaultCenter={{ lat: -1.4413, lng: -48.4837 }}
    onRightClick={(event) => props.addMarcador(event.latLng)}
  >

    {props.marcadores.map((marcador, i) => (
       <MarcadorWrapper
        key={i}
        marcador={marcador}
        marcadorSelecionado={props.marcadorSelecionado}
        selecionarMarcador={props.selecionarMarcador}
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
          onClick={() => this.props.selecionarMarcador(marcador)}
        >

        { this.state.isOpen &&
          <InfoWindow
            onCloseClick={this.onToggleOpen}
          >
            <h1 className="info">{marcador.nome}</h1>
          </InfoWindow>
        }
        </Marker>
    )
  }
}

class Mapa extends Component {

    addMarcador(location) {
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
        } else {
          let corpo = JSON.parse(body)
          console.log(corpo["response"]["groups"][0]["items"].map((item) => (
            {
              "nome": item["venue"]["name"],
              "endereco": item["venue"]["location"]["address"],
              "lat": item["venue"]["location"]["lat"],
              "lng": item["venue"]["location"]["lng"]
            }
            )))
        }
      });
    }

    render() {
        const { isLateralToggled, marcadores, marcadorSelecionado, selecionarMarcador } = this.props
        return (
            <main className={isLateralToggled ? "mapa-toggle" : "mapa"}>
                <MyMapComponent
                    addMarcador={this.addMarcador}
                    marcadorSelecionado={marcadorSelecionado}
                    selecionarMarcador={selecionarMarcador}
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