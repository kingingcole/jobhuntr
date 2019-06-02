import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import Button from '../atoms/Button'
import FeaturedOfferSection from '../organisms/FeaturedOffersSection'
import OtherOffersSection from '../organisms/OtherOffersSection'
import BASE_API from '../../constants'
import axios from 'axios'
import CustomLoader from '../atoms/Loader'

class Index extends Component{

    state = {
        featured: [],
        promoted: [],
        timeline: [],
    }

    componentDidMount() {
        let url = `${BASE_API}/home`;
        axios.get(url)
            .then(res => {
                console.log(res.data);

                let {timeline, featured, promoted} = res.data
                this.setState({
                    featured: featured,
                    promoted: promoted,
                    timeline: timeline[Object.keys(timeline)[0]],
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render(){
        let {featured, promoted, timeline} = this.state;
        // console.log(featured);
        // console.log(promoted, promoted.length);

        // console.log(timeline , timeline.length);

        // console.log(timeline[Object.keys(timeline)[0]])

        const jobs_section = featured.length && promoted.length ? (
                <Fragment>
                    <FeaturedOfferSection featured={featured}/>
                    <OtherOffersSection promoted={promoted} timeline={timeline}/>
                </Fragment>
            ) : (<CustomLoader/>);

        return(
            <section>
                <div className="container">
                    <Helmet>
                        <title>Jobs - Jobhuntr.io</title>
                        <meta name="description" content="Technical jobs from top comapnies and startups. Full-time, contract and remote." />
                    </Helmet>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 style={{fontWeight: '800'}}>The best place to find <span style={{color:'rgb(108, 99, 255)'}}>technical</span> jobs on the internet</h2>
                            <p className='lead'>Browse from jobs provided by the best companies in the world</p>
                            <Link to='/job/create'>
                                <Button fontSize='20px'>Post a job <small style={{display: ''}}>from $199</small></Button>
                            </Link>
                            <i style={{display: 'block', fontSize: '0.8em', marginTop: '5px'}}>No sign up required</i>

                            {jobs_section}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Index