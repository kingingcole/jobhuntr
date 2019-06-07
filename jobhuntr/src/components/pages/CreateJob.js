import React, {Component} from 'react';
import CreateJob1 from './CreateJob1'
import CreateJob2 from './CreateJob2'
import CreateJob3 from './CreateJob3'
import Payment from './Payment'
import JobSubmitted from './JobSubmitted'
import BASE_API from '../../constants'
import axios from 'axios'


class CreateJob extends Component{
    state = {
        step: 1,
        amount: '',
        jobDetails: {
            title: '',
            tags: 'hy',
            type: 'Full time',
            location: '',
            city: '',
            salary: '500 - 1000',
            is_remote: 1,
            apply_link: '',
            description: '',
            responsibilities: '',
            requirements: '',
            company_name: '',
            company_tagline: '',
            company_twitter: '',
            company_url: '',
            email: '',
            category_id: '1',
            tier_id: '  ',
            company_logo: null
        }
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step : step + 1,
        });
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step : step - 1
        })
    };

    handleChange = (target, value) => {
        this.setState({
            jobDetails: {...this.state.jobDetails, [target]: value}
        });
    };

    setAmountCharged = (amount) => {
        this.setState({
            amount
        })
    };

    submitJob = () => {
        let url = `${BASE_API}/offers`;
        let {title, tags, type, location, city, salary, is_remote, apply_link, description, responsibilities, requirements, company_name, company_tagline, company_twitter,company_url, email, category_id, tier_id, company_logo} = this.state.jobDetails;
        let formData = new FormData();
        formData.append('title', title);
        formData.append('tags', tags);
        formData.append('type', type);
        formData.append('location', location);
        formData.append('city', city);
        formData.append('salary', salary);
        formData.append('is_remote', is_remote);
        formData.append('apply_link', apply_link);
        formData.append('description', description);
        formData.append('responsibilities', responsibilities);
        formData.append('requirements', requirements);
        formData.append('company_name', company_name);
        formData.append('company_tagline', company_tagline);
        formData.append('company_twitter', company_twitter);
        formData.append('company_url', company_url);
        formData.append('email', email);
        formData.append('category_id', category_id);
        formData.append('tier_id', tier_id);
        formData.append('company_logo', company_logo, company_logo.name);
        console.log(formData);
        axios.post(url, formData)
            .then(res => {
                console.log(res.data);
                // this.props.history.push('/job/create/success')
                this.nextStep()
            })
            .catch(err => {
                console.log(err);
                console.log(err.response);
            })

    };


    render() {
        const {step} = this.state;
        const {title, type, location, city, apply_link, description, responsibilities, requirements, company_name, company_tagline, company_twitter,company_url,email, } = this.state.jobDetails;
        const values = {title, type, location, city, apply_link, description, responsibilities, requirements, company_name, company_tagline, company_twitter,company_url,email, };
        switch(step) {
            case 1:
                return <CreateJob1
                    step={step}
                    nextStep={this.nextStep}
                    handleChange = {this.handleChange}
                    values={values}
                />;
            case 2:
                return <CreateJob2
                    step={step}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    values={values}
                />;
            case 3:
                return <CreateJob3
                    step={step}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    submitJob = {this.submitJob}
                    setAmountCharged = {this.setAmountCharged}
                    values={values}
                />;
            case 4:
                return <Payment
                step={step}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                values={values}
                submitJob={this.submitJob}
                amount={this.state.amount}
                />
            case 5:
                return <JobSubmitted />
            default:
                return null
        }
    }
}

export default CreateJob