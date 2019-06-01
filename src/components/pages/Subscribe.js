import React, {Component} from 'react';
import Button from '../atoms/Button';
import CustomLoader from '../atoms/Loader'
import axios from 'axios'
import BASE_API from '../../constants'
import {Link} from "react-router-dom";
import { Helmet } from 'react-helmet';


class Subscribe extends Component {

    state = {
        categories: [],
        countries: [],
        countriesWithState: '',
        subscribing: false,
        subscribed: false,
        emailTakenErr: '',
        preference: {
            email: '',
            category_id: [],
            location: 'Afghanistan',
            frequency: '1',
        }
    };


    componentDidMount() {

        let url = `${BASE_API}/categories`;
        axios.get(url)
            .then(res => {
                // console.log(res.data.data);
                this.setState({
                    categories: res.data.data
                });

            })
            .catch(err => {
                console.log(err, err.response);
            });

        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                // console.log(res.data);
                this.setState({
                    countries: res.data
                })
            })
            .catch(err => {
                console.log(err, err.response);
            });

        // axios.get('countries.json')
        //     .then(res => {
        //         console.log(res.data);
        //         // console.log(res.data[this.state.preference.location])
        //         this.setState({countriesWithState: res.data})
        //         }
        //     )
    }

    handleChange = (target, value) => {
        this.setState({
            preference: {...this.state.preference, [target]: value}
        });
        // console.log(this.state)
    };

    

    handleCategoryChange = () => {
        let el = document.getElementById('category');
        // console.log(this.getSelectedCategories(el));
        var selected = [];
        for (var i = 0; i < el.length; i++) {
            if (el.options[i].selected) selected.push(el.options[i].value);
        }
        this.setState({
            preference: {...this.state.preference, ['category_id']: selected}
        })
        console.log(selected);
        // this.handleChange('category_id', this.handleCategoryChange(el))
    }


    Subscribe = (e) => {
        e.preventDefault();
        let url = `${BASE_API}/subscribe`;
        let {preference} = this.state;
        this.setState({
           subscribing: true 
        })
        axios.post(url, preference)
            .then(res => {
                console.log(res.data);
                this.setState({subscribed: true})
            })
            .catch(err=>{
                console.log(err, err.response.data.errors.email[0]);
                if (err.response.data.errors.email[0]){
                    console.log('yeah');
                    let emailTakenErr = err.response.data.errors.email[0]
                    this.setState({
                        emailTakenErr,
                        subscribing: false
                    })
                }
            })
        // console.log(preference) 
    };

    render() {
        let {categories, countries, countriesWithState, subscribing, subscribed, emailTakenErr} = this.state;
        let btnText = subscribing ? ('Subscribing...') : ('Subscribe')
        let {email, location} = this.state.preference;
        if (categories.length) {

            var CategoryField = categories.map(category => {
                return (
                    <option value={category.id} key={category.id}>{category.name}</option>
                )
            })
        }



        if (countries.length) {
            var CountryField = countries.map(country => {
                return (
                    <option value={country.name} key={country.numericCode}>{country.name}</option>
                )
            })
        }
        const form_section = categories.length && countries.length ? (
            <form className='mx-auto' style={{maxWidth: '500px'}} onSubmit={(e) => this.Subscribe(e)}>
                <p className="text-center">Fill in the form below with your job preferences and we will email them to
                    you as soon as they're posted.</p>
                <div className="form-group">
                    <label htmlFor="email" className='input-label'>Your email</label>
                    <small className="required">required</small>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                           placeholder="awesome@you.com" required value={email}
                           onChange={(e) => this.handleChange('email', e.target.value)}/>
                    {emailTakenErr.length ? (
                            <p className='form-submit-error'>{emailTakenErr}</p>
                        ) : (null)}
                </div>
                <div className="form-group">
                    <label htmlFor="category" className='input-label'>Choose interest</label>
                    <small className="required">required</small>
                    <select multiple className="form-control" id='category' required
                            onChange={this.handleCategoryChange}>
                        {CategoryField}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="location" className='input-label'>Location</label>
                    <small className="required">required</small>
                    <select className="form-control" id='location' required
                            onChange={(e) => this.handleChange('location', e.target.value)}>
                        {CountryField}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="frequency" className='input-label'>Frequency</label>
                    <small className="required">required</small>
                    <select className="form-control" id='frequency' required
                            onChange={(e) => this.handleChange('frequency', e.target.value)}>

                        <option value='1'>Daily</option>
                        <option value='2'>Weekly</option>
                        <option value='3'>Monthly</option>
                    </select>
                </div>
                <Button width='100%' fontWeight='500'>{btnText.toUpperCase()}</Button>
                <i style={{margin: '10px 0', fontSize: '0.7em'}}>No spams, we promise!</i>
            </form>
        ) : (

            <CustomLoader/>

        );


        return(
            <section>
                <div className="container">
                    <Helmet>
                        <title>Subscribe - Jobhuntr.io</title>
                        <meta name="description" content="Sign up to receive email alerts of your job preferences as they are posted!" />
                    </Helmet>
                    <div className="row">
                        
                        {subscribed ? (
                                <>
                                    <div className='col-12'>
                                        <h2 className="font-weight-bold text-center mx-auto" style={{maxWidth:'700px'}}>Thanks for subscribing. Look out for our next job post email!</h2>
                                    </div>
                                    <div className='col-12'>
                                        <div className='row'>
                                            <div className="col-sm-12 col-md-6 text-md-right text-center my-2">
                                                <Link to='/'>
                                                    <Button className='cta-btn' type='button' bgColor='rgba(108, 99, 255, 0.1)' color='#8481B4' fontSize='0.875rem' fontWeight='500' padding='7px 37px'>GO HOME</Button>
                                                </Link>
                                            </div>
                                            <div className="col-sm-12 col-md-6 text-center text-md-left my-2">
                                                <Link to='/job/create'>
                                                    <Button className='cta-btn' type='button' bgColor='#6C63FF' color='white' fontSize='0.875rem' fontWeight='500' padding='7px 37px'>POST A JOB</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col-12">
                                    <h2 className="font-weight-bold text-center mx-auto" style={{maxWidth:'700px'}}>You are one step away from landing your next job.</h2>
                                    </div>
                                    <div className="col-12">
                                        {form_section}
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </section>
        )
    }
}


export default Subscribe
