import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// https://tomchentw.github.io/react-google-maps/
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: -1.4413, lng: -48.4837 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -1.4413, lng: -48.4837 }} />}
  </GoogleMap>
));

class Mapa extends Component {
    
    render() {
        const { isLateralToggled } = this.props
        return (
            <main className={isLateralToggled ? "mapa-toggle" : "mapa"}>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDk9y-BWlt1u5klFVBGxWocj2DnHV_e9k&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </main>
        );
    }
}

export default Mapa;