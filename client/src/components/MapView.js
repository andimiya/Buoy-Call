import React, {Component} from 'react';
import { Map, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: null
    };

    this.getAllBuoys = this.getAllBuoys.bind(this);
  }

  getAllBuoys(){
   return new Promise((resolve,reject) => {
     function reqListener(){
       resolve(JSON.parse(this.responseText));
     }
     let oReq = new XMLHttpRequest();
     oReq.open('GET', `/allbuoys`);
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
     oReq.open('GET', `/allsharks`);
     oReq.setRequestHeader('Content-type',
       'application/json')
     oReq.addEventListener("load", reqListener)
     oReq.send()
   })
  }

  componentDidMount() {
    Promise.all([
      this.getAllSharks(),
      this.getAllBuoys()
    ])
    .then((markers) => {
      
      let marker = markers[0].concat(markers[1]);

      console.log(marker, 'markers');
    })
  }

  render(){
    const { marker } = this.state;
    console.log(marker, 'data');

    if(!marker){
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
            markers={marker}
            wrapperOptions={{enableDefaultStyle: true}} />
        </Map>
    );
  }
}
export default MapView;
