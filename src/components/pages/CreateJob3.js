import React, {Component, Fragment} from 'react'
import CreateJobHeading from '../molecules/CreateJobHeading'
import '../../css/create-job1.css'
import CreateJobProgress from '../molecules/CreateJobProgress';
import JobTier from '../molecules/JobTier'
import Button from '../atoms/Button'
import CustomLoader from '../atoms/Loader'
import axios from 'axios'
import BASE_API from '../../constants'
import PaypalCheckout from '../molecules/PaypalCheckout'

// import {Link} from "react-router-dom";


class CreateJob3 extends Component {

    state = {
        plans: [],
        price: 0
    };

    setPrice = (price) => {
        this.setState({
            price
        })
    };

    submitTier = () => {
        this.props.setAmountCharged(this.state.price);
        this.props.nextStep();
    };

    componentDidMount() {
        document.title = 'Create Job (Billing)- JobHuntr.io';
        console.log(this.props.values)
        let url = `${BASE_API}/tiers`;
        axios.get(url)
            .then(res => {
                let plans = res.data.data;
                this.setState({
                    plans
                });
            })
    }


    inputStyle = {
        maxWidth: '225px',
        height: '40px',
        border: '1px solid #D9D7FF',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
        padding: '5px'
    };

    render() {

        let {handleChange, submitJob, step, prevStep} = this.props;
        let {plans, price} = this.state;
        if (plans.length) {
            var tiers = this.state.plans.map(plan => {
                return <JobTier name={plan.name} features={plan.features} price={plan.price} key={plan.id} id={plan.id}
                                setPrice={this.setPrice} handleChange={handleChange}/>
            });
        }
        let plansPage = this.state.plans.length ? (
            <section className="job-info">
                <div className="container">
                    <CreateJobHeading/>
                    <div className="create-job-body mx-auto">
                        <CreateJobProgress progress='Select plan' step={step}/>
                        <div className="container">
                            <div className="row">
                                {tiers}
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12 col-md-6 mb-3">
                                <input id='coupon' type="text" style={this.inputStyle}
                                       placeholder='Enter valid coupon code'/>

                            </div>
                            <div className='col-12 col-md-6 text-right'>
                                <h5 className='font-weight-bold mb-2'>Total Payment Due</h5>
                                <h5 className='mt-0 font-weight-bold'>{`$${this.state.price}`}</h5>
                            </div>

                        </div>
                        <div className='row'>
                            <div className="col-sm-12 col-md-6 text-md-right text-center my-2">
                                <Button onClick={prevStep} type='button' bgColor='rgba(108, 99, 255, 0.1)'
                                        color='#8481B4'
                                        className='btn' fontSize='0.875rem' fontWeight='500'
                                        padding='7px 37px'>BACK</Button>
                            </div>
                            <div className="col-sm-12 col-md-6 text-center text-md-left my-2">
                                <Button onClick={this.submitTier} type='submit' bgColor='#6C63FF' color='white'
                                        className='btn'
                                        fontSize='0.875rem'
                                        fontWeight='500' padding='7px 37px'>NEXT</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        ) : (
            <CustomLoader/>
        );
        return (
            <Fragment>
                {plansPage}
            </Fragment>
        )
    }
};

export default CreateJob3