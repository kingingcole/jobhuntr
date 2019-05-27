import React, {Component} from 'react'
import PaypalButton from '../atoms/PaypalButton'



const CLIENT = {
    sandbox: 'AUsUD3_M-UE3ZQB3hkAQ25o-pDjbp8qgWXNS9KVIRzjTpgwxGZ7yVRC8L-xgAmGIWgscoGtQWH_KtdK7',
    production: 'Ae14rsFLiQ4K-RXVBQfXJKMQ_cq4mn7VGRHM2vs97YJMNr0jhteHkOwvfpQLckCILsOcwn6K5-1eKutF',
};

// const ENV = process.env.NODE_ENV === 'production'
//     ? 'production'
//     : 'sandbox';

const ENV = 'production'

class PaypalCheckout extends Component{
	render() {

        let {price, submitJob} = this.props;
		const onSuccess = (payment) => {
			console.log('Successful payment!', payment);
			submitJob()
		};

        const onError = (error) =>
            console.log('Erroneous payment OR failed to load script!', error);

        const onCancel = (data) =>
            console.log('Cancelled payment!', data);

        return (
    		 <PaypalButton
                style={this.style}
                client={CLIENT}
                env={ENV}
                commit={true}
                currency={'USD'}
                total={price}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
                />
        	)
	}
};

export default PaypalCheckout