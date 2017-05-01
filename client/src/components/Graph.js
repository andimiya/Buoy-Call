import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { addGraphToState, addBuoyYearsToState, addBuoyIdToState, addMonthToState, addYearToState } from '../actions';
import YearDropDown from './YearDropDown.js';

class Graph extends Component {
  constructor(props){
    super(props)

    this.state = {
      month: '1'
    }

    this.buoyChange = this.buoyChange.bind(this);
    this.yearChange = this.yearChange.bind(this);
    this.monthChange = this.monthChange.bind(this);
    this.changeBuoyDataXHR = this.changeBuoyDataXHR.bind(this);
  }

  monthChange(event){
    event.preventDefault()
    this.props.onAddMonthToState(event.target.value)
    new Promise((resolve,reject) => {
      this.setState({
        month: event.target.value
      })
      resolve();
    })
    .then(()=>{
      this.changeBuoyDataXHR()
      .then((data) => {
        this.props.onAddGraphToState(data)
      })
      .catch(function(err){
        console.log("change error", err)
      })
    })
  }


  yearChange(event){
    event.preventDefault()
    new Promise((resolve,reject) => {
      this.setState({
        year: event.target.value
      })
      resolve();
    })
    .then(()=>{
      this.changeBuoyDataXHR()
      .then((data) => {
        this.props.onAddGraphToState(data)
      })
      .catch(function(err){
        console.log("change error", err)
      })
    })
  }


  getBuoyData(){
    return new Promise((resolve,reject) => {
      function reqListener(){
        resolve(JSON.parse(this.responseText));
      }
      let oReq = new XMLHttpRequest();
      oReq.open('GET', `/api/buoy/test/${this.state.buoyid}/${this.state.year}/${this.state.month}`);
      oReq.setRequestHeader('Content-type',
        'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.send()
    })
  }

  changeBuoyDataXHR(value){
    console.log(`/api/buoy/test/${this.props.buoyid}/${this.props.yy}/${this.state.month}`)
    return new Promise((resolve,reject) => {
      function reqListener(){
        resolve(JSON.parse(this.responseText));
      }
      let oReq = new XMLHttpRequest();
      oReq.open('GET', `/api/buoy/test/${this.props.buoyid}/${this.props.yy}/${this.state.month}`);
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
    event.preventDefault();
    this.props.onAddBuoyIdToState(event.target.value)
    this.getBuoyYearsXHR(event.target.value)
    .then((data) => {
      console.log("data", data)
      this.props.onAddBuoyYearsToState(data);
      this.props.onAddYearToState(data[0].yy);
      return this.yearChangeXHR(data[0].yy);
    })
    .then((data) => {
      this.props.onAddGraphToState(data);
    })
    .catch(function(err){
      console.log("change error", err)
    })
  }

  dataTypeChange(event){
    event.preventDefault();
  }

  componentDidMount(){
    
  }


  render(){
    return(
      <div>

        <AreaChart width={1400} height={250} data={this.props.graphState}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.5}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="dd" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" fill="#F5DA81"/>
          <Tooltip />
          <Area type="monotone" dataKey="wvht" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
        <div>
          {this.props.buoyid}
        </div>

        
        <YearDropDown />
        <div onChange={this.monthChange}>
          <select>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>


        <input id="datatype_wvht" type="radio" value="wvht" name="datatype" checked={this.wvhtDatatype}/><label htmlFor="datatype_wvht">Wave Height</label>
        <br />
        <input id="datatype_wtmp" type="radio" value="wtmp" name="datatype"/><label htmlFor="datatype_wtmp">Wave Temp</label>


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
    },
    onAddBuoyYearsToState:(data) => {
      dispatch(addBuoyYearsToState(data))
    },
    onAddBuoyIdToState:(data) => {
      dispatch(addBuoyIdToState(data))
    },
    onAddMonthToState:(data) => {
      dispatch(addMonthToState(data))
    },
    onAddYearToState:(data) => {
      dispatch(addYearToState(data));
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

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
