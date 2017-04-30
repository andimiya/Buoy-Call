import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import config from '../../config';

class Checkout extends React.Component {
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
  <div className="stripe">
      <StripeCheckout
        name="Larn Yay"
        description="Saving the Ocean"
        amount={500}
        currency="USD"
        stripeKey={config.STRIPE.PUBLISHABLE_KEY}
        locale="en"
        src="//checkout.stripe.com/v2/checkout.js"
        class="stripe-button"
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
