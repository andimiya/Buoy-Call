import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
// import MarkerClusterGroup from 'react-leaflet-markercluster';
// import places from '../lib/data.json';
import {GeoJsonCluster} from 'react-leaflet-geojson-cluster';
import request from 'superagent';
// const geodata = JSON.stringify(places);

const position = [-8.310,19.087];

// const markers = [
//   {lat: 49.8397, lng: 24.0297},
//   {lat: 52.2297, lng: 21.0122},
//   {lat: 51.5074, lng: -0.0901}
// ];

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: null
    };
  }
  componentWillMount() {
    request
      .get('http://localhost:8080/allbuoys')
      .end(function(error, response){
        if (error) return console.log(error);

        this.setState({
          places: response.body
        });
      }.bind(this));
  }

  render(){
    const { places } = this.state;
    if(!places){
      return (<div>loading...</div>);
    }

    console.log('this.state', this.state.places.features[0].geometry.coordinates);

    return (
      <div className="MapView">
        <Map id="map"
          style={{height: '900px'}}
          center={[-8.310,19.087]}
          zoom={1.5}
          minzoom={0}
          maxzoom={15}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/jonathonlaylo/cj1g01mw200062ss53ht46jgb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9uYXRob25sYXlsbyIsImEiOiJjajE3bDUwZ2YwNHhjMnFvN2cwaW5vYWFrIn0.ZYv3mfTj8HIP5LdLMWvw4Q"
            attribution="<attribution>"
          />
          <GeoJsonCluster data={places}/>
        </Map>
      </div>
    );
  }
}
export default MapView;