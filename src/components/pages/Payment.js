import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../atoms/CheckoutForm';

class Payment extends Component {
    render() {
        let {amount} = this.props;
        console.log(amount);
        return (
            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                <section>
                    <div className="container">
                        <Elements>
                            <CheckoutForm amount={amount}/>
                        </Elements>
                    </div>
                </section>
            </StripeProvider>
        );
    }
}

export default Payment;
