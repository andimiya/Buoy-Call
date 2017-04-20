import React, { Component } from 'react';
import Router from 'react-router';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';


class Graph extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 500},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 400},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 200},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 218},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 250},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 210},
]

  render(){
    return(
      <LineChart width={600} height={300} data={this.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="year"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="pv" stroke="red" strokeDasharray="5 5"/>
       <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeDasharray="3 4 5 2"/>
       <Line type="monotone" dataKey="amnt" stroke="purple" strokeDasharray="3 4 5 2"/>
      </LineChart>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    isLoggedIn: state.loggedIn,
    currentURL: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(Graph)