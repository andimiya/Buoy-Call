import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import config from '../../config';
import { connect } from 'react-redux';
import { addSharkToState, addSharkNameToState } from '../actions';
import '../containers/App/App.css';

class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sharkData: null,
      sharkName: null
    };

    this.handleChangeSharkName = this.handleChangeSharkName.bind(this);
    // this.handleChangeSharkName = this.handleChangeSharkName.bind(this);
  }


  getAllSharks(){
    return new Promise((resolve,reject) => {
      function reqListener(){
        resolve(JSON.parse(this.responseText));
      }
      let oReq = new XMLHttpRequest();
      console.log(this.props.shark_id, 'shark id');
      console.log(this.props.shark_name, 'shark id');

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
        this.setState({
        sharkData: data})

          console.log(this.state.sharkData.species, 'this state');

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
      console.log("Success",success)
      if(success){
        this.props.history.push('/confirmation')
      }
    })
  }

  handleChangeSharkName(event){
    console.log(this.state, 'state in handlechange');
    this.setState({sharkName: event.target.value})
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
    onAddSharkToState:(data) => {
      dispatch(addSharkToState(data));
    },
    onAddSharkNameToState:(data) => {
      dispatch(addSharkNameToState(data));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    shark_id: state.shark_id,
    shark_name: state.shark_name
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
