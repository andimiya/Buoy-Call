import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import config from '../../config';
import '../containers/App/App.css';

class Donate extends Component {

  onToken = (token) => {
    var body = JSON.stringify(token);
    fetch(`/api/charge`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body
    })
    .then((success) => {
      if(success){
        this.props.history.push('/confirmation-donation')
      }
    })
    .catch(err => {
      this.props.history.push('/error')
    })
  }

  render() {

    return (
      <div id="checkout-container">
        <h1>Donate</h1>
        <div className="payment-description">
        <p>Don't want to name a shark? Make a donation instead!<br />
        Donations will be shared among non-profits with a mission towards environmental protection and marine sciences.</p>
        </div>
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


export default Donate;
