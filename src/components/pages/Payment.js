import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../atoms/CheckoutForm';

class Payment extends Component {
    render() {
        return (
            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                <section>
                    <div className="container">
                        <Elements>
                            <CheckoutForm/>
                        </Elements>
                    </div>
                </section>
            </StripeProvider>
        );
    }
}

export default Payment;
