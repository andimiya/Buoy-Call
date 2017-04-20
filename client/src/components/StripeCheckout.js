import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

class Checkout extends React.Component {
  onToken = (token) => {
    var body = JSON.stringify(token);
    fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body
    })
    .then(token => {
      alert(`Success on front-end ${token.email}`);
    });
  }

  render() {
    return (
      <StripeCheckout
        name="Larn Yay"
        description="Saving the Ocean"
        amount={500}
        currency="USD"
        stripeKey="pk_test_iPd55BpU9blDhsX1734a5hr7"
        locale="en"
        src="http://checkout.stripe.com/v2/checkout.js"
        class="stripe-button"
        data-key="pk_test_iPd55BpU9blDhsX1734a5hr7"
        data-locale="auto"
        alipay
        bitcoin
        token={this.onToken}
        >
      </StripeCheckout>
    )
  }
}

export default Checkout;
