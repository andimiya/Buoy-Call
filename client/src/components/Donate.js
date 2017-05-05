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
  }

  render() {

    return (
      <div id="checkout-container">
       <div className="donate-image">
      <img width="45%" src={require('../assets/donations-01.png')} />
      </div>
        <div className="payment-description">
        <p>Don't want to name a shark?<span id="highlight"> Make a donation instead! </span><br/>
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
