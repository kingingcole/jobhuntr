import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../atoms/CheckoutForm';


let stripe_pk_test = process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY;
let stripe_pk_live = process.env.REACT_APP_STRIPE_PUBLIC_LIVE_KEY;
let node_env = process.env.NODE_ENV

let apiKey = node_env === 'development' ? stripe_pk_test : stripe_pk_live;

class Payment extends Component {

    render() {
        let {amount, values, submitJob} = this.props;
        console.log(apiKey, node_env);
        return (
            <StripeProvider apiKey={apiKey}>
                <section>
                    <div className="container">
                        <Elements>
                            <CheckoutForm amount={amount} values={values} submitJob={submitJob}/>
                        </Elements>
                    </div>
                </section>
            </StripeProvider>
        );
    }
}

export default Payment;
