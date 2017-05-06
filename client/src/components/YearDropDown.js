import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addYearToState, addGraphToState } from '../actions';

class YearDropDown extends Component {
  constructor(props){
    super(props)

    this.yearChange = this.yearChange.bind(this);
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

  yearChange(event){
    event.preventDefault()
    this.props.onAddYearToState(event.target.value)
    this.yearChangeXHR(event.target.value)
    .then((data) => {
      this.props.onAddGraphToState(data)
    })
    .catch(err => {
      this.props.history.push('/error')
    })
  }

  render(){
    if(this.props.graphState !== null){
    return(
      <div className="year" onChange={this.yearChange}>
        <select>
          {
            this.props.years.map(({ yy }) =>
            <option key={yy} value={yy}>
            {yy}
            </option>
             )
          }
        </select>
      </div>
    )} else {
      return(null)
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
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

export default connect(mapStateToProps, mapDispatchToProps)(YearDropDown)
