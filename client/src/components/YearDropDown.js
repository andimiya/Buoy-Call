import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addYearToState, addGraphToState } from '../actions';

class YearDropDown extends Component {
  constructor(props){
    super(props)

    this.state = {
    }

    this.yearChange = this.yearChange.bind(this);
  }

  yearChangeXHR(year){
    console.log("xhr", `/api/buoy/test/${this.props.buoyid}/${this.props.yy}/${this.props.mm}`, this.props)
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
    console.log("year change")
    event.preventDefault()
    this.props.onAddYearToState(event.target.value)
    console.log(this.props.yy)
    this.yearChangeXHR(event.target.value)
    .then((data) => {
      this.props.onAddGraphToState(data)
    })
    .catch(function(err){
      console.log("change error", err)
    })
  }

  render(){
    return(
      <div onChange={this.yearChange}>
        <select>
          {
            this.props.years.map(({ yy }) =>
            <option value={yy}>
            {yy}
            </option>
             )
          }
        </select>
      </div>
    )
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