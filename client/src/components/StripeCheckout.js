import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import config from '../../config';
import { connect } from 'react-redux';
import { addSharkToState } from '../actions';
import '../containers/App/App.css';

class Checkout extends Component {

  constructor(props) {
    super(props);

  }

  getAllSharks(){
    return new Promise((resolve,reject) => {
      function reqListener(){
        resolve(JSON.parse(this.responseText));
      }
      let oReq = new XMLHttpRequest();
      console.log(this.props.mm, 'mm id');
      console.log(this.props.shark_id, 'shark id');

      oReq.open('GET', `/api/shark/${this.props.shark_id}`);
      oReq.setRequestHeader('Content-type',
       'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.send()
    })
  }

  componentDidMount(arr) {
    Promise.all([
      this.props.onAddSharkToState(this.props.match.params.shark_id)
    ])
    .then(() => {
      this.getAllSharks()
      .then((data) => {
        console.log(data, 'shark data');
      })
    })
  }

  onToken = (token) => {
    var body = JSON.stringify(token);
    fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body
    })
    .then((success) => {
      console.log("Success",success)
      if(success){
        this.props.history.push('/confirmation')
      }
    })
  }

  render() {
    return (
      <div id="checkout-container">
        <h1>Adopt and Donate</h1>
        <div className="payment-description">
        <p>Adopt a buoy or a shark by making a donation!<br />
        Donations will be shared among non-profits with a mission towards environmental protection and marine sciences.</p>
        </div>
        <StripeCheckout
          name="Larn Yay"
          description="Saving the Ocean"
          ComponentClass="div"
          panelLabel="Adopt a Buoy or Shark"
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
    onAddSharkToState:(data) => {
      dispatch(addSharkToState(data));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    shark_id: state.shark_id,
    mm: state.mm
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
