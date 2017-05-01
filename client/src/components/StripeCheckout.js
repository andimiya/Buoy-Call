import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import config from '../../config';

class Checkout extends React.Component {
  onToken = (token) => {
    var body = JSON.stringify(token);
    fetch('/api/charge', {
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

export default Checkout;
