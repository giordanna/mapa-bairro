import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, FaAnchor, Paper, Typography } from "react-google-maps"
import { compose, withProps, withStateHandlers } from "recompose"
import request from "request"
import Modal from "react-responsive-modal"

// https://tomchentw.github.io/react-google-maps/

const MyMapComponent = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    clickableIcons={false}
    defaultZoom={15}
    defaultCenter={{ lat: -1.4413, lng: -48.4837 }}
    onRightClick={(event) => props.addMarcador(event.latLng, props.addLista, props.abrirModal)}
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

    render() {
      const { marcador } = this.props
      return (
        <Marker
          position={{ lat: marcador.lat, lng: marcador.lng }}
          onClick={() => this.props.selecionarMarcador(marcador)}
        >
        </Marker>
    )
  }
}

class Mapa extends Component {

  state = {
    modalOpen: false,
    possiveisLocais: []
  }

  abrirModal = () => {
    this.setState({ modalOpen: true })
  }

  fecharModal = () => {
    this.setState({ modalOpen: false })
  }
  addLista = (lista) => {
    this.setState({ possiveisLocais: lista})
  }

  addMarcador = (location, addLista, abrirModal) => {
    let lista = []
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
        let corpo = JSON.parse(body)
        if (err) {
          console.error(err);
        } else if (corpo["meta"]["code"] == 429) {
          console.error(corpo["meta"]["errorDetail"]);
          lista = [
            {
            "id" : "erro",
              "nome": "Erro: não foi possível recuperar",
              "endereco": "Se você estiver vendo isso, provavelmente o limite de requisições foi atingido. Aguarde um dia.",
              "lat": "erro",
              "lng": "erro"
            }
          ]
        } else {
          /* lembrar que pode atingir limite */
          lista = corpo["response"]["groups"][0]["items"]
          .sort((item_a, item_b) =>
            item_a["venue"]["location"]["distance"] - item_b["venue"]["location"]["distance"])
          .map((item) => (
            {
              "id" : item["venue"]["id"],
              "nome": item["venue"]["name"],
              "endereco": item["venue"]["location"]["address"],
              "lat": item["venue"]["location"]["lat"],
              "lng": item["venue"]["location"]["lng"],
              "categoria": item["venue"]["categories"][0]["name"],
              "img": "/img/erro.jpg"
            }
            ))

          addLista(lista)
          abrirModal()
          
           /*
          lista.forEach((item) => {
            request({
              url: "https://api.foursquare.com/v2/venues/" + item["id"] + "/photos",
              method: "GET",
              qs: {
                client_id: "DFT4IMWTELLO00IVL3AHBOBW45LRBGO0D34SY14E155LUCBK",
                client_secret: "FT25LN2Q2LAI0KMPSY5YEACTC0X2DFXCQKNKB1TQTYLLQ3NC",
                v: "20180323",
                "limit": "1"
              }
            }, function(err, res, body) {
              let corpo = JSON.parse(body)
              if (err) {
                console.error(err);
               } else if (corpo["meta"]["code"] == 429) {
                  console.error(corpo["meta"]["errorDetail"]);
                } else {
                console.log(corpo)
                item ["img"] = corpo["response"]["photos"]["items"][0]["prefix"]
                  +
                  "width"
                  +
                  corpo["response"]["photos"]["items"][0]["width"]
                  +
                  corpo["response"]["photos"]["items"][0]["suffix"]
                  
              }
            })
          })*/
          
        }
      })
    }

    render() {
        const { isLateralToggled, marcadores, marcadorSelecionado, selecionarMarcador, createMarcador } = this.props
        return (
            <main className={isLateralToggled ? "mapa-toggle" : "mapa"}>
                <MyMapComponent
                    addMarcador={this.addMarcador}
                    marcadorSelecionado={marcadorSelecionado}
                    selecionarMarcador={selecionarMarcador}
                    marcadores={marcadores}
                    abrirModal={this.abrirModal}
                    addLista={this.addLista}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDk9y-BWlt1u5klFVBGxWocj2DnHV_e9k&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <div>
                <Modal open={this.state.modalOpen} onClose={this.fecharModal} center>
                  <h2>Escolha o local que você gostaria de adicionar:</h2>
                  {this.state.possiveisLocais.map((local, i) => (
                    <div>
                      <div className="localEscolher" key={i} onClick={() => { createMarcador(local); this.fecharModal() } }>
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
        )
    }
}

export default Mapa