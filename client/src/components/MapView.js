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
    this.getBuoyData = this.getBuoyData.bind(this);
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

  //
  //  let sharksArray = [];
  //
  //  for(let i = 0; i < data.length; i++){
  //    let sharkCoordinates = {
  //      lat: data[i].pings[0].latitude,
  //      lng: data[i].pings[0].longitude,
  //      popup: 'test'
  //    };
  //    sharksArray.push(sharkCoordinates);
  //  }
  //  res.json(sharksArray);
  // }

  getBuoyData(){
    console.log('test get buoy data function');
  }

  componentDidMount(arr) {
    let markers = null;
    Promise.all([
      this.getAllBuoys(),
    ])
    .then((arr) => {
      let coordinates = arr[0];
      coordinates = coordinates[0];
      let coordinateArray = [];
      for(let i = 0; i < coordinates.length; i++){
        let properties = {
          lat: Number(coordinates[i].lat),
          lng: Number(coordinates[i].long),
          popup: 'View historical buoy data below this map!'
        };
        coordinateArray.push(properties);
      }
      markers = coordinateArray;
    })
    .then(() => {
      this.getAllSharks()
      .then((data) => {
        console.log(data, 'shark data');

      })
    })
    // .then((data) => {
    //   console.log(data, 'shark data');
    //   this.setState({
    //     markers: markers
    //   })
    // })
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
            onMarkerClick={(marker) => console.log(this.getBuoyData(), 'Test')}
            wrapperOptions={{enableDefaultStyle: true}} />
        </Map>
    );
  }
}
export default MapView;
