import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMonthToState, addGraphToState } from '../actions';


class MonthDropDown extends Component {
  constructor(props){
    super(props)

    this.state = {}

    this.monthChange = this.monthChange.bind(this);
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

  render(){
    if(this.props.graph !== null){
    return(
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
    )
  } else {
    return(
      null
    )
  }
  }


}

const mapDispatchToProps = (dispatch) => {
  return{
    onAddGraphToState:(data) => {
          dispatch(addGraphToState(data));
        },
    onAddMonthToState:(data) => {
          dispatch(addMonthToState(data))
        }
  }
}

const mapStateToProps = (state) => {
  return{
  graph: state.graph,
  mm: state.mm,
  buoyid: state.buoyid,
  yy: state.yy
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthDropDown);