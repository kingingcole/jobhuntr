import React, {Component} from 'react';
import axios from 'axios'
import CustomLoader from '../atoms/Loader'
import BASE_API from '../../constants'
import { Helmet } from 'react-helmet';

import SJDS from '../molecules/SingleJobDetailsSection'
import JobDetailDescription from '../atoms/JobDetailDescription'
import JobDetailRequirements from '../atoms/JobDetailRequirements'
import JobDetailResponsibilities from '../atoms/JobDetailResponsibilities'
import SJSS from '../molecules/SingleJobShareSection'
import CompanyLogo from '../atoms/CompanyLogo'

class SingleJobDetail extends Component{

    state = {
        job: '',
    };

    componentDidMount() {
        let {slug} = this.props.match.params;
        let url = `${BASE_API}/offers/${slug}`;
        console.log(url);
        axios.get(url)
            .then(res => {
                console.log(res.data.data);
                this.setState({job: res.data.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let pageUrl = window.location.href;
        let {slug} = this.props.match.params;
        let {job} = this.state;
        let {company_logo, title, company_name, company_url, type, location, city, salary, description, requirements, responsibilities} = job;
        console.log(this.state.job)
        let desc = `${title} at ${company_name} - JobHuntr.io`


        return this.state.job ? (
            <section className="job-info" >
                <div className="container" >
                    <Helmet>
                        <title>{title + ' - JobHuntr.io'}</title>
                        <meta name="description" content={desc} />
                    </Helmet>
                    <div className="row">
                        <div className="col-8">
                            <SJDS 
                            title={title} 
                            company={company_name} 
                            website={company_url} 
                            type={type} 
                            location={location}
                            city={city}
                            salary={salary}
                            />
                        </div>
                        <div className="col-4">
                            <CompanyLogo logo={company_logo}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <JobDetailDescription description={description}/>
                            <hr/>
                            <JobDetailResponsibilities responsibilities={responsibilities}/>
                            <hr/>
                            <JobDetailRequirements requirements={requirements}/>
                        </div>
                        <div className="col-12 col-md-3">
                            <SJSS pageUrl={pageUrl} company_name={company_name} title={title}/>
                        </div>
                    </div>
                </div>
            </section>
        ) : (
            <CustomLoader/>
        )
    }
}


export default SingleJobDetail