import React, {Component} from 'react';
import { Map, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
// import util from 'util';
// leave util commented out, it's used to inspect console.logs in the map when needed.
import { connect } from 'react-redux';
import { addBuoyYearsToState, addBuoyIdToState, addYearToState, addGraphToState, changeDataType } from '../actions';

const sharkMarker = L.icon({
  iconUrl:'https://d30y9cdsu7xlg0.cloudfront.net/png/703212-200.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
})

const buoyMarker = L.icon({
  iconUrl:'https://d30y9cdsu7xlg0.cloudfront.net/png/889187-200.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
})


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
      this.props.onAddGraphToState([])
    })
  }

  dataChange(event){
    this.props.onChangeDataType('wvht')
  }

  getBuoyData(input){
    console.log(input)
    this.dataChange();
    let reader = document.createElement('div');
    reader.innerHTML = input._popup._content;
    let buoyid = reader.firstChild.id
    if(buoyid){
      this.buoyChange(buoyid)
    }
    if(!buoyid){
      //if its not a buoy (it's a shark), we force a null graph to get rid of data
      this.props.onAddGraphToState("Shark")
    }
  }

  generateBuoyPopupContent(buoy){
    // return buoy.buoyid;
    //DONT MESS WITH THE ID.
    return `<span id="${buoy.buoyid}">${buoy.buoyid}</span>`;
  }

  generateSharkPopupContent(shark){
    return `Shark name: ${shark.name}<br>
      Weight: ${shark.weight}<br>
      Species: ${shark.species}<br>
      Gender: ${shark.gender}<br>
      <br>
      <a href="/adopt/${shark.shark_id}"><button class="adopt">Adopt Me</button></a>`
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
          popup: this.generateBuoyPopupContent(coordinates[i]),
          options: {icon: buoyMarker}
        };
        coordinateArray.push(properties);
      }
      markers = coordinateArray;
    })
    .then(() => {
      this.getAllSharks()
      .then((data) => {
        let sharkArray = [];
        for(let i = 0; i < data.length; i++){
          let properties = {
            lat: Number(data[i].latitude),
            lng: Number(data[i].longitude),
            popup: this.generateSharkPopupContent(data[i]),
            options: {icon: sharkMarker}
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
      return (<div className="loader"></div>);
    }
    return (
      <div>
      <br />
      <p className="small-gray-text">Click on the map below to view historical data for buoys across our oceans and lakes, or to adopt a shark. Check back often as tagged sharks will change position on the map and new data will be reported from buoys.</p>
      <br />
        <Map className="markercluster-map"
          style={{height: '600px'}}
          center={[-8.310,12.087]}
          zoom={3}
          maxBounds={[
            [85.0, -180.0],
            [-85, 180.0]
          ]}
          minZoom={2}
          maxZoom={10}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/jonathonlaylo/cj1g01mw200062ss53ht46jgb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9uYXRob25sYXlsbyIsImEiOiJjajE3bDUwZ2YwNHhjMnFvN2cwaW5vYWFrIn0.ZYv3mfTj8HIP5LdLMWvw4Q"
          />
          <MarkerClusterGroup
            markers={markers}
            onMarkerClick={this.getBuoyData}
            wrapperOptions={{enableDefaultStyle: true}} />
        </Map>
        </div>
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
    },
    onChangeDataType:(data) => {
      dispatch(changeDataType(data));
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
    mm: state.mm,
    datatype: state.datatype
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapView)
