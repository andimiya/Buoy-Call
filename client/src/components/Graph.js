import React, { Component } from 'react';
import Router from 'react-router';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { addGraphToState } from '../actions';

class Graph extends Component {
  constructor(props){
    super(props)

    this.changeBuoyData = this.changeBuoyData.bind(this)
  }


  getBuoyData(){
    return new Promise(function(resolve,reject){
      function reqListener(){
        resolve(JSON.parse(this.responseText));
      }
      let oReq = new XMLHttpRequest();
      oReq.open('GET', '/api/buoy/41002/2015');
      oReq.setRequestHeader('Content-type', 
        'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.send()
    })
  }

  changeBuoyDataXHR(){
    return new Promise(function(resolve,reject){
      function reqListener(){
        resolve(JSON.parse(this.responseText));
      }
      let oReq = new XMLHttpRequest();
      oReq.open('GET', '/somebuoys2');
      oReq.setRequestHeader('Content-type', 
        'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.send()
    })
  }

  changeBuoyData(event){
    event.preventDefault()
    this.changeBuoyDataXHR()
    .then((data) => {
      this.props.onAddGraphToState(data)
    })
    .catch(function(err){
      console.log("change error", err)
    })
  }

  componentDidMount(){
    this.getBuoyData()
    .then((data) => {
      let newData = data.filter(function(value, index, Arr) {
      return index % 168 == 0;
      });
      this.props.onAddGraphToState(newData)
    })
    .catch(function(err){
      console.log("component did mount on graph error", err)
    })
  }


  render(){
    console.log(this.props.graphState)
    return(
      <div>
        <form onSubmit={this.changeBuoyData}>
          <input type="submit" value="Change the data!" />
        </form>
        <LineChart width={1000} height={300} data={this.props.graphState}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="year"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Line type="monotone" dataKey="wvht" stroke="red" strokeDasharray="5 5"/>
         <Line type="monotone" dataKey="wtmp" stroke="#82ca9d" strokeDasharray="3 4 5 2"/>
        </LineChart>

        <AreaChart width={730} height={250} data={this.props.graphState}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="dd" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="wvht" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
        <AreaChart width={730} height={250} data={this.props.graphState}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.5}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.5}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="mm" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="wtmp" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    isLoggedIn: state.loggedIn,
    currentURL: ownProps.location.pathname
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onAddGraphToState:(data) => {
      dispatch(addGraphToState(data));
    }
  }
}

const mapStateToProps = (state) => {
  console.log("Graph page state", state)
  return {
    graphState: state.graph
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)