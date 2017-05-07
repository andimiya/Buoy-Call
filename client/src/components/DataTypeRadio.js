import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeDataType } from '../actions/index';

class DataTypeRadio extends Component {
  constructor(props){
    super(props)

    this.state = {
      test: 'hello'
    }

    this.dataChange = this.dataChange.bind(this);
  }

  getArray(){
    var dataArr = [];
    var dataObject = this.props.graph[0];
    for(var key in dataObject){
      if(dataObject[key] && 
        key !== 'yy' && 
        key !== 'mm' && 
        key !== 'dd'){
        dataArr.push({datatype: key})
      }
    }
    return dataArr
  }

  dataStringify(acronym){
    switch(acronym){
      case "wvht":
        return "Wave Height"

      case "wtmp":
        return "Water Temperature"

      case "atmp":
        return "Air Temperature"

      case "apd":
        return "Average Wave Period"

      case "dpd":
        return "Dominant Wave Period"

      default:
        return
    }
  }

  dataChange(event){
    this.props.onChangeDataType(event.target.value)
  }

  render(){
    if(this.props.graph !== null){
    return(
      <div className="graphButton">
        <form className="radioButtons">
          {
            this.getArray().map(({ datatype }) => 
              <div className="button" key={datatype}>
                <input className="radioButton" id={datatype} type="radio" value={datatype} name={datatype} onChange={this.dataChange} checked={this.props.datatype === datatype} />
                <label htmlFor={ datatype }>{this.dataStringify(datatype)}</label>
              </div>
            )
          }
        </form><br />
      </div>
    )
  } else {
    return(
      <div className="selectbuoy">
        <h1>Please Select a Buoy </h1>

      </div>
    )
    return(null)
  }
  }
}

const mapStateToProps = (state) => {
  return {
    graph: state.graph,
    datatype: state.datatype
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onChangeDataType:(data) => {
      dispatch(changeDataType(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTypeRadio);