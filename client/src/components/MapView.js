import React, {Component} from 'react';
import { Map, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import util from 'util';
import { connect } from 'react-redux';
import { addBuoyYearsToState, addBuoyIdToState, addYearToState, addGraphToState } from '../actions';

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

  getBuoyYearsXHR(buoyid){
    return new Promise((resolve, reject) => {
      function reqListener(){
        resolve(JSON.parse(this.responseText));
      }
      let oReq = new XMLHttpRequest();
      oReq.open('GET', `/api/buoy/${buoyid}/getDataYears`);
      oReq.setRequestHeader('Content-type',
        'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.send()
    })
  }

  yearChangeXHR(year){
    console.log("xhr", `/api/buoy/test/${this.props.buoyid}/${year}/${this.props.mm}`, this.props)
    return new Promise((resolve, reject) => {
      function reqListener(){
        resolve(JSON.parse(this.responseText));
      }
      let oReq = new XMLHttpRequest();
      oReq.open('GET', `/api/buoy/test/${this.props.buoyid}/${year}/${this.props.mm}`);
      oReq.setRequestHeader('Content-type',
        'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.send()
    })
  }

  buoyChange(event){
    this.props.onAddBuoyIdToState(event)
    this.getBuoyYearsXHR(event)
    .then((data) => {
      this.props.onAddBuoyYearsToState(data);
      this.props.onAddYearToState(data[0].yy);
      return this.yearChangeXHR(data[0].yy);
    })
    .then((data) => {
      this.props.onAddGraphToState(data);
    })
    .catch((err) => {
      this.props.onAddGraphToState([{}])
      alert("There is no data for this buoy currently")
    })
  }

  getBuoyData(input){
    this.buoyChange(input._popup._content)
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
          popup: coordinates[i].buoyid
        };
        coordinateArray.push(properties);
      }
      markers = coordinateArray;

    })
    .then(() => {
      this.getAllSharks()
      .then((data) => {
        let sharkCoordinates = data;
        let sharkArray = [];
        for(let i = 0; i < sharkCoordinates.length; i++){
          let properties = {
            lat: Number(sharkCoordinates[i].pings[0].latitude),
            lng: Number(sharkCoordinates[i].pings[0].longitude),
            popup: `Shark name: ${sharkCoordinates[i].name}<br>
              Length: ${sharkCoordinates[i].length}<br>
              Weight: ${sharkCoordinates[i].weight}<br>
              Species: ${sharkCoordinates[i].species}<br>
              Last seen: ${sharkCoordinates[i].pings[0].datetime}`,
          };
          sharkArray.push(properties);
        };
        markers = markers.concat(sharkArray);
        this.setState({
          markers: markers
        })
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
          style={{height: '400px'}}
          center={[-8.310,12.087]}
          zoom={2}
          minZoom={2}
          maxZoom={8}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/jonathonlaylo/cj1g01mw200062ss53ht46jgb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9uYXRob25sYXlsbyIsImEiOiJjajE3bDUwZ2YwNHhjMnFvN2cwaW5vYWFrIn0.ZYv3mfTj8HIP5LdLMWvw4Q"
          />
          <MarkerClusterGroup
            markers={markers}
            onMarkerClick={(marker) => console.log(this.getBuoyData())}
            wrapperOptions={{enableDefaultStyle: true}} />
        </Map>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onAddBuoyYearsToState:(data) => {
      dispatch(addBuoyYearsToState(data))
    },
    onAddBuoyIdToState:(data) => {
      dispatch(addBuoyIdToState(data))
    },
    onAddYearToState:(data) => {
      dispatch(addYearToState(data));
    },
    onAddGraphToState:(data) => {
      dispatch(addGraphToState(data));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    graphState: state.graph,
    loggedInUser: state.loggedInUser,
    years: state.years,
    buoyid: state.buoyid,
    yy: state.yy,
    mm: state.mm
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapView)
