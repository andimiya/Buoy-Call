import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
// import mapboxgl from 'mapbox-gl';
// import loadData from '../lib/buoydata.js';
// import places from '../lib/buoy.geojson';
import buoy from '../lib/data.json';
import shark from '../lib/datashark.json';
import ReactMapboxGl, { Marker, Cluster, ZoomControl } from 'react-mapbox-gl';

const containerStyle = {
  height: '800px',
  width: '100%'
};

const position = [-8.310,19.087];

const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    border: '2px solid #56C498'
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9'
  }
}

class MapView extends Component {

  onMarkerClick(coords) {
    console.log(coords);
  }

  clusterMarker = (coordinates, pointCount) => (
    <Marker coordinates={coordinates} key={coordinates.toString()} style={styles.clusterMarker}>
      { pointCount }
    </Marker>
  );

  render() {

    return (
      <ReactMapboxGl
        zoom={[1]}
        center={position}
        style="mapbox://styles/jonathonlaylo/cj1g01mw200062ss53ht46jgb"
        accessToken="pk.eyJ1Ijoiam9uYXRob25sYXlsbyIsImEiOiJjajE3bDUwZ2YwNHhjMnFvN2cwaW5vYWFrIn0.ZYv3mfTj8HIP5LdLMWvw4Q"
        containerStyle={containerStyle}>
        <ZoomControl/>
        <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={8}>
          {
            buoy.features.map((feature, key) =>
              <Marker
                key={key}
                style={styles.marker}
                coordinates={feature.geometry.coordinates}
                onClick={this.onMarkerClick.bind(this, feature.geometry.coordinates)}>
                B
              </Marker>
            )
          }
        </Cluster>
        <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={8}>
          {
            shark.features.map((feature, key) =>
              <Marker
                key={key}
                style={styles.marker}
                coordinates={feature.geometry.coordinates}
                onClick={this.onMarkerClick.bind(this, feature.geometry.coordinates)}>
                S
              </Marker>
            )
          }
        </Cluster>
        <ZoomControl/>
      </ReactMapboxGl>
    );
  }
}

export default MapView;