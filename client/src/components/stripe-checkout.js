import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

class Checkout extends React.Component {
  onToken = (token) => {
    console.log(token, 'token');
    fetch('http://localhost:8080/charge', {
      method: 'POST',
      body: token,
    })
    .then(response => {
      response.json().then(data => {
        console.log(data, 'payment data');
        alert(`Payment was successful, thank you ${data.email}`);
      });
    })
  }

  render() {
    return (
      <StripeCheckout
        stripeKey="pk_test_iPd55BpU9blDhsX1734a5hr7"
        token={this.onToken}
        name="Larn Yay"
        description="Saving the Ocean"
        currency="USD"
        locale="en"
        amount={500}
        alipay
        bitcoin
        >
      </StripeCheckout>
    )
  }
}

export default Checkout;
