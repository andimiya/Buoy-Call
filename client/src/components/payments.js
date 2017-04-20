import React, {Component} from 'react';
var Stripe;

class Payments extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    Stripe.setPublishableKey('pk_test_iPd55BpU9blDhsX1734a5hr7');
  }

  handleSubmit(event){
    console.log('Pay');
    event.preventDefault();
    Stripe.card.createToken(event.currentTarget, (status, response) => {
      console.log(status, response);
    });
  }

  render(){
    return(

        <form action="/checkout" method ="post" id="payment-form" onSubmit={this.handleSubmit}>
        <script
          src="https://checkout.stripe.com/checkout.js" class="stripe-button"
          data-key="pk_test_a82VbFeXcTfWOcbWyd7H0Wgt"
          data-amount="999"
          data-name="andrea-takamiya-lwx6.squarespace"
          data-description="Widget"
          data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
          data-locale="auto">
        </script>
      </form>
    )
  }
}

export default Payments;
