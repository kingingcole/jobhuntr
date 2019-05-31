import React, {Component} from 'react';
import {CardElement, injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements';
import Button from '../atoms/Button'
import {Link} from "react-router-dom";

let stripe_sk_test = process.env.REACT_APP_STRIPE_SECRET_TEST_KEY;
let stripe_sk_live = process.env.REACT_APP_STRIPE_SECRET_LIVE_KEY;
let node_env = process.env.NODE_ENV;

let stripe_key = node_env === 'development' ? stripe_sk_test : stripe_sk_live

console.log(stripe_key);

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {complete: false};
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        // User clicked submit
        let {token} = await this.props.stripe.createToken({name: "Name"});
        console.log(token.id)
        let response = await fetch("/charge", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: 2000,
                tokenId: token.id
            })
        });

        if (response.ok) {
            this.setState({complete: true});
        } else{
            console.log(response, response.err)
        }
    }

    render() {

        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (
            <div className="checkout" style={{maxWidth: '600px', margin: 'auto'}}>
                <p>Would you like to complete the purchase?</p>
                {/*<CardElement/>*/}
                <CardNumberElement className='stripe-input'/>
                <div className="row my-4">
                    <div className="col-6">
                        <CardExpiryElement className='stripe-input'/>
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
