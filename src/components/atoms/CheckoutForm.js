import React, {Component} from 'react';
import {CardElement, injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements';
import Button from '../atoms/Button'
import {Link} from "react-router-dom";
import axios from 'axios'


// these lines use secret stripe keys hidden in a .env file and not deployed to github
// to work on this, create a .env file in the project root and add your test keys from stripe
let stripe_sk_test = process.env.REACT_APP_STRIPE_SECRET_TEST_KEY; //stripe secret test key
let stripe_sk_live = process.env.REACT_APP_STRIPE_SECRET_LIVE_KEY; //stripe secret live key
let node_env = process.env.NODE_ENV;

// checks node envirpnment whether dev or production
// if dev use the test stripe keys
// if production use the stripe live keys
let stripe_key = node_env === 'development' ? stripe_sk_test : stripe_sk_live;


class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    state = {
        complete: false, // is payment complete?
        paying: false, //state to show status of the form. Used by the submit button
        cardExpired: '', //state for card expired
        incorrectCVC: '', // state for incorrect CVC
        cardProcessingError: '', // state for other card errors
        cardError: '' //this is the state that handles card error when tokenization from client does not work. May be due to network or error in card details
    }

    onFocus = (elemType) => { //function for when each Stripe input field is focused
        let id = `stripe-${elemType}`;
        let elem = document.getElementById(id);
        elem.classList.add("stripe-input-focus")
    }

    onBlur = (elemType) => { //function for when each Stripe input field is blurred
        let id = `stripe-${elemType}`;
        let elem = document.getElementById(id);
        elem.classList.remove("stripe-input-focus")
    }

    async submit(ev) {
        // User clicked submit
        this.setState({paying: true}); //sets button text to 'paying...'
        let {token} = await this.props.stripe.createToken({name: "Name"});
        if (token){
            // tokenization is successful and a token is returned. Yay!

            if (this.state.cardError.length){
                this.setState({cardError: ''}) // removes error message if there is one already
            }; 

            let testToken = 'tok_visa' //this is used in testing for a specific error in stripe
            let tokenId = node_env === 'development' ?  testToken : token.id;

            let {amount, values} = this.props //passed down from Payment.js
            if (values) {
                var {company_name} = values
            }
            
            axios({
                  method: 'post',
                  url: '/charge',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  data: {
                    amount: amount*100 || 2000, //this should be dynamic and coming from price of selected tier in tier selection plan
                    tokenId,
                    stripe_key,
                    company_name: company_name || 'Test Inc.'
                  }
            })
                .then(res => {
                    console.log(res);
                    if (res.data.status === 'succeeded' || res.data.status){
                        // transaction was successful
                        this.props.submitJob()
                        // this.setState({complete: true});
                        //submit job form here
                    } else{
                        // transaction was not successful
                        // run error handling for major card issues

                        this.setState({
                            paying: false, //this returns button text from 'paying...' back to 'pay and submit'
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

        } else{
            // token does not complete because card details are incorrect
            this.setState({
                cardError: 'An error occured while initiating the transaction. Please check your card details and/or network.',
                paying: false //this returns button text from 'paying...' back to 'pay and submit'
            })
        }
    }

    render() {
        let {paying, cardError, cardExpired, incorrectCVC, cardProcessingError} = this.state
        let {amount, values} = this.props;
        console.log(node_env);
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (
            <div className="checkout" style={{maxWidth: '600px', margin: 'auto'}}>
                <h3>*Submit card details to complete the post for ${amount}</h3>
                {/*<CardElement/>*/}

                {cardError.length ? (
                            <p className='form-submit-error'>{cardError}</p>
                        ) : (null)}
                <label htmlFor='stripe-cardNumber' className='stripe-input-label'>Card Number</label>
                <CardNumberElement className='stripe-input' id='stripe-cardNumber' onFocus = {(e) => this.onFocus(e.elementType)} onBlur = {(e) => this.onBlur(e.elementType)}/>
                {cardProcessingError.length ? (
                            <p className='form-submit-error'>{cardProcessingError}</p>
                        ) : (null)}
                <div className="row my-4">
                    <div className="col-6">
                        <label htmlFor='stripe-cardExpiry' className='stripe-input-label'>Expiry Date</label>
                        <CardExpiryElement className='stripe-input' id='stripe-cardExpiry' onFocus= {(e) => this.onFocus(e.elementType)}onBlur = {(e) => this.onBlur(e.elementType)} />
                        {cardExpired.length ? (
                            <p className='form-submit-error'>{cardExpired}</p>
                        ) : (null)}
                    </div>
                    <div className="col-6">
                        <label htmlFor='stripe-cardCvc' className='stripe-input-label'>CVC</label>
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
                                    ) : ('**PAY AND SUBMIT JOB')}
                            </Button>
                    </div>
                </div>
                <div className='assurance' style={{marginTop: '20px', fontSize: '0.8em'}}>
                    <p>* Job will be submitted <i>if</i> payment is successful<br/>** Payment is secured and powered by Stripe. We <b>do not</b> handle your card details.</p>
                </div>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
