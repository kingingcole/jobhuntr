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
        paying: false,
        cardExpired: '', //state for card expired
        incorrectCVC: '',
        cardProcessingError: '',
        cardError: '' //this is the state that handles card error when tokenization from client does not work. May be due to network or error in card details
    }

    onFocus = (elemType) => {
        let id = `stripe-${elemType}`;
        let elem = document.getElementById(id);
        console.log(elem);
        elem.classList.add("stripe-input-focus")
    }

    onBlur = (elemType) => {
        let id = `stripe-${elemType}`;
        let elem = document.getElementById(id);
        console.log(elem);
        elem.classList.remove("stripe-input-focus")
    }

    async submit(ev) {
        // User clicked submit
        this.setState({paying: true});
        let {token} = await this.props.stripe.createToken({name: "Name"});
        if (token){
            // tokenization is successful and a token is returned. Yay!

            if (this.state.cardError.length){
                this.setState({cardError: ''}) // removes error message if there is one already
            }; 

            // console.log(token.id);
            let testToken = 'tok_visa' //this is used in testing for a specific error in stripe
            let tokenId = node_env === 'development' ?  testToken : token.id;
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
                    amount: 29900, //this should be dynamic and coming from price of selected tier in tier selection plan
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

                        this.setState({
                            paying: false,
                            cardError: 'An error occured while initiating the transaction. Please check your card details and/or network.'
                        })
                        
                        switch(res.data.error.code) {
                            case 'expired_card':
                                // expired card
                                this.setState({cardExpired: res.data.error.message});
                                break;
                            case 'incorrect_cvc':
                                // cvc is incorrect
                                this.setState({incorrectCVC: res.data.error.message});
                                break;
                            case 'processing_error':
                                // error in card number
                                this.setState({cardProcessingError: res.data.error.message});
                                break;
                            case 'card_declined':
                                // card declined
                                this.setState({cardProcessingError: res.data.error.message});
                                break;
                            case 'insufficient_funds':
                                // broke ass niggas
                                this.setState({cardProcessingError: res.data.error.message})
                                break;
                            default:
                                // every other thing goes
                                this.setState({cardProcessingError: 'An error occurred. Please try again later.'})

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
            console.log('Token error');
            this.setState({
                cardError: 'An error occured while initiating the transaction. Please check your card details and/or network.',
                paying: false
            })
        }
    }

    render() {
        let {paying, cardError, cardExpired, incorrectCVC, cardProcessingError} = this.state
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (
            <div className="checkout" style={{maxWidth: '600px', margin: 'auto'}}>
                <p>Would you like to complete the purchase?</p>
                {/*<CardElement/>*/}

                {cardError.length ? (
                            <p className='form-submit-error'>{cardError}</p>
                        ) : (null)}

                <CardNumberElement className='stripe-input' id='stripe-cardNumber' onFocus = {(e) => this.onFocus(e.elementType)} onBlur = {(e) => this.onBlur(e.elementType)}/>
                {cardProcessingError.length ? (
                            <p className='form-submit-error'>{cardProcessingError}</p>
                        ) : (null)}
                <div className="row my-4">
                    <div className="col-6">
                        <CardExpiryElement className='stripe-input' id='stripe-cardExpiry' onFocus= {(e) => this.onFocus(e.elementType)}onBlur = {(e) => this.onBlur(e.elementType)} />
                        {cardExpired.length ? (
                            <p className='form-submit-error'>{cardExpired}</p>
                        ) : (null)}
                    </div>
                    <div className="col-6">
                        <CardCVCElement className='stripe-input' id='stripe-cardCvc' onFocus= {(e) => this.onFocus(e.elementType)} onBlur = {(e) => this.onBlur(e.elementType)}/>
                        {incorrectCVC.length ? (
                            <p className='form-submit-error'>{incorrectCVC}</p>
                        ) : (null)}
                    </div>
                </div>
                {/*<button onClick={this.submit}>Send</button>*/}
                <div className='row'>
                    <div className="col-sm-12 col-md-6 text-md-right text-center my-2">
                        <Link to='/'>
                            <Button type='button' bgColor='rgba(108, 99, 255, 0.1)' color='#8481B4' className='btn' fontSize='0.875rem' fontWeight='500' padding='7px 37px'>CANCEL AND GO HOME</Button>
                        </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 text-center text-md-left my-2">
                            <Button onClick={this.submit} type='button' bgColor='#6C63FF' color='white' className='btn' fontSize='0.875rem' fontWeight='500' padding='7px 37px'>
                                {paying ? (
                                        'PAYING...'
                                    ) : ('PAY AND SUBMIT JOB')}
                            </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
