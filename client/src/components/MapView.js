import React, {Component} from 'react';
import { Map, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: null
    };

    this.getAllBuoys = this.getAllBuoys.bind(this);
  }

  getAllBuoys(){
   return new Promise((resolve,reject) => {
     function reqListener(){
       resolve(JSON.parse(this.responseText));
     }
     let oReq = new XMLHttpRequest();
     oReq.open('GET', `/api/allbuoys`);
     oReq.setRequestHeader('Content-type',
       'application/json')
     oReq.addEventListener("load", reqListener)
     oReq.send()
   })
  }

  getAllSharks(){
   return new Promise((resolve,reject) => {
     function reqListener(){
       resolve(JSON.parse(this.responseText));
     }
     let oReq = new XMLHttpRequest();
     oReq.open('GET', `/api/allsharks`);
     oReq.setRequestHeader('Content-type',
       'application/json')
     oReq.addEventListener("load", reqListener)
     oReq.send()
   })
  }

  componentDidMount(arr) {
    let markers = null;
    Promise.all([
      // this.getAllSharks(),
      this.getAllBuoys(arr)
    ])
    .then((arr) => {
      let coordinates = arr[0];
      coordinates = coordinates[0];
      let coordinateArray = [];
      for(let i = 0; i < coordinates.length; i++){
        let properties = {
          lat: Number(coordinates[i].lat),
          lng: Number(coordinates[i].long),
          popup: 'Buoy Test'
        };
        coordinateArray.push(properties);
      }
      markers = coordinateArray;
      this.setState({
        markers: markers
      })
    })
  }

  render(){
    const { markers } = this.state;

    if(!markers){
      return (<div>loading...</div>);
    }

    return (
        <Map className="markercluster-map"
          style={{height: '900px'}}
          center={[-8.310,19.087]}
          zoom={1.5}
          minZoom={0}
          maxZoom={15}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/jonathonlaylo/cj1g01mw200062ss53ht46jgb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9uYXRob25sYXlsbyIsImEiOiJjajE3bDUwZ2YwNHhjMnFvN2cwaW5vYWFrIn0.ZYv3mfTj8HIP5LdLMWvw4Q"
          />
          <MarkerClusterGroup
            markers={markers}
            onMarkerClick={(marker) => console.log(marker, marker.getLatLng(), 'Test')}
            wrapperOptions={{enableDefaultStyle: true}} />
        </Map>
    );
  }
}
export default MapView;
