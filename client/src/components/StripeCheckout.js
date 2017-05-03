import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import config from '../../config';
import { connect } from 'react-redux';
import { addSharkToState, addSharkIdToState, addSharkNameToState } from '../actions';
import '../containers/App/App.css';

class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sharkData: null,
      sharkName: null
    };

    this.handleChangeSharkName = this.handleChangeSharkName.bind(this);

  }


  getAllSharks(){
    return new Promise((resolve,reject) => {
      function reqListener(){
        resolve(JSON.parse(this.responseText));
      }
      let oReq = new XMLHttpRequest();
      oReq.open('GET', `/api/shark/${this.props.shark_id}`);
      oReq.setRequestHeader('Content-type',
       'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.send()
    })
  }

  componentDidMount(arr) {
    Promise.all([
      this.props.onAddSharkIdToState(this.props.match.params.shark_id)
    ])
    .then(() => {
      this.getAllSharks()
      .then((data) => {
        console.log(data, 'data');
        this.props.onAddSharkToState(data.shark_id, data.name, data.species, data.gender, data.length, data.weight, data.datetime)
      })
    })
  }

  onToken = (token) => {
    var body = JSON.stringify(token);
    this.props.onAddSharkNameToState(this.state.sharkName);
    fetch(`/api/charge/${this.state.sharkName}/${this.props.shark_id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body
    })
    .then((success) => {
      if(success){
        this.props.history.push('/confirmation')
      }
    })
  }

  handleChangeSharkName(event){
    this.setState({sharkName: event.target.value})
    console.log(this.props, 'props');
  }

  render() {
    return (
      <div id="checkout-container">
        <h1>Adopt and Donate</h1>
        <div className="payment-description">
        <p>Adopt a buoy or a shark by making a $5 donation!<br />
        Donations will be shared among non-profits with a mission towards environmental protection and marine sciences, and you get to name your shark!</p>
        <br />
        <p>Give your shark a name on the line below, then click the 'Pay with Card' button to make your donation.</p>
        <br />
        <br />
        <h1>This is your shark to name!</h1><br />
          {this.props.sharkData}
        </div>
        <form>
          <input type='text' onChange={this.handleChangeSharkName} placeholder="Name Your Shark" name="Name Your Shark" /><br/>
        </form>
        <br />
        <br />
        <StripeCheckout
          name="Buoy Call"
          description="Saving the Ocean"
          ComponentClass="div"
          amount={500}
          currency="USD"
          stripeKey={config.STRIPE.PUBLISHABLE_KEY}
          locale="en"
          alipay
          bitcoin
          token={this.onToken}
          >
        </StripeCheckout>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onAddSharkToState:(shark_id, name, species, gender, length, weight, datetime) => {
      dispatch(addSharkToState(shark_id, name, species, gender, length, weight, datetime));
    },
    onAddSharkIdToState:(shark_id) => {
      dispatch(addSharkIdToState(shark_id));
    },
    onAddSharkNameToState:(shark_name) => {
      dispatch(addSharkNameToState(shark_name));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    shark: state.shark,
    shark_id: state.shark_id,
    shark_name: state.shark_name
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
