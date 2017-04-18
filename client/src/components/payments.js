import React, {Component} from 'react';
var Stripe;

class Payments extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    Stripe.setPublishableKey('pk_test_a82VbFeXcTfWOcbWyd7H0Wgt');
  }

  handleSubmit(event){
    event.preventDefault();
    Stripe.card.createToken(event.currentTarget, (status, response) => {
      console.log(status, response);
    });
  }

  render(){
    return(
        <form method ="post" onSubmit={this.handleSubmit}>
          <input size="20" data-stripe="number" placeholder="number" />
          <input size="4" data-stripe="cvc" placeholder="number" />
          <input size="2" data-stripe="exp-month" placeholder="exp-month" />
          <input size="4" data-stripe="exp-year" placeholder="exp-year" />
          <button type="submit">Pay</button>
        </form>
    )
  }
}

export default Payments;
