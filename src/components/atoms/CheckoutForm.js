import React, {Component} from 'react';
import {CardElement, injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements';
import Button from '../atoms/Button'
import {Link} from "react-router-dom";
import axios from 'axios'

let stripe_sk_test = process.env.REACT_APP_STRIPE_SECRET_TEST_KEY;
let stripe_sk_live = process.env.REACT_APP_STRIPE_SECRET_LIVE_KEY;
let node_env = process.env.NODE_ENV;

// checks node envirpnment whether dev or production
// if dev use the test stripe keys
// if production use the stripe live keys
let stripe_key = node_env === 'development' ? stripe_sk_test : stripe_sk_live;


class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        // this.state = {complete: false};
        this.submit = this.submit.bind(this);
    }

    state = {
        complete: false,
        cardExpired: '', //state for card expired
        cardError: '' //this is the state that handles card error when tokenization from client does not work. May be due to network or error in card details
    }

    async submit(ev) {
        // User clicked submit
        let {token} = await this.props.stripe.createToken({name: "Name"});
        if (token){
            // tokenization is successful and a token is returned. Yay!

            if (this.state.cardError.length){
                this.setState({cardError: ''}) // removes error message if there is one already
            }; 

            console.log(token.id);
            let tokenId = node_env === 'development' ?  'tok_chargeDeclinedExpiredCard' : token.id;
            // let response = await fetch("/charge", {
            //     method: "POST",
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         amount: 2000,
            //         tokenId,
            //         stripe_key
            //     })
            // });
            axios({
                  method: 'post',
                  url: '/charge',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  data: {
                    amount: 2000,
                    tokenId,
                    stripe_key
                  }
            })
                .then(res => {
                    console.log(res);
                    if (res.data.status === 'succeeded' || res.data.status){
                        // transaction was successful
                        this.setState({complete: true});
                        //submit job form here
                    } else{
                        // transaction was not successful
                        // run error handling for major card issues

                        //expired card
                        if (res.data.error.code === 'expired_card'){
                            this.setState({cardExpired: res.data.error.message})
                        }
                    }
                })
                .catch(err => {
                    console.log(err, err.response)
                })

            // if (response.ok) {
            //     this.setState({complete: true});
            // } else{
            //     console.log(response, response.err)
            // }
        } else{
            // token does not complete because card details are incorrect
            console.log('Token error')
            this.setState({
                cardError: 'An error occured while initiating the transaction. Please check your card details and/or network.'
            })
        }
    }

    render() {
        let {cardError, cardExpired} = this.state
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (
            <div className="checkout" style={{maxWidth: '600px', margin: 'auto'}}>
                <p>Would you like to complete the purchase?</p>
                {/*<CardElement/>*/}

                {cardError.length ? (
                            <p className='form-submit-error'>{cardError}</p>
                        ) : (null)}

                <CardNumberElement className='stripe-input'/>
                <div className="row my-4">
                    <div className="col-6">
                        <CardExpiryElement className='stripe-input'/>
                        {cardExpired.length ? (
                            <p className='form-submit-error'>{cardExpired}</p>
                        ) : (null)}
                    </div>
                    <div className="col-6">
                        <CardCVCElement className='stripe-input'/>
                    </div>
                </div>
                {/*<button onClick={this.submit}>Send</button>*/}
                <div className='row'>
                    <div className="col-sm-12 col-md-6 text-md-right text-center my-2">
                        <Link to='/'>
                            <Button type='button' bgColor='rgba(108, 99, 255, 0.1)' color='#8481B4' className='btn' fontSize='0.875rem' fontWeight='500' padding='7px 37px'>CANCEL</Button>
                        </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 text-center text-md-left my-2">
                            <Button onClick={this.submit} type='button' bgColor='#6C63FF' color='white' className='btn' fontSize='0.875rem' fontWeight='500' padding='7px 37px'>PAY</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
