import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import CompanyLogo from '../atoms/CompanyLogo'
import Button from '../atoms/Button'
import Tags from '../atoms/Tags'

const FeaturedJobListing = ({logo, company, title, time, slug, tags}) => {

    const job_url = `/job/${slug}`;
    let job_tags;
    if (tags) {
        job_tags = tags.map(tag => {
            return (
                <Tags tag={tag.name} key={Math.random()}/>
            )
        })
    }
    return (

        <div className='container-fluid'>
            <div className="row py-4">
                <div className=" col-md-6 col-sm-12">
                    <div className="row text-left">
                        <div className="col-4">
                            <CompanyLogo logo={logo} company={company} width='80px'/>
                        </div>
                        <div className="col-8">
                            <h4 className="font-weight-bold mb-1">
                                <Link to={job_url}>
                                    {title}
                                </Link>
                            </h4>
                            <span>{company}</span>
                            <small style={{opacity: '0.3', margin: '0px 12px'}}>{time}</small>
                            <div>
                                {job_tags}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-6 col-sm-12 my-auto">
                    <Link to={job_url}>
                        <Button className='apply-btn' color='white'
                                fontWeight='300'>APPLY
                            NOW</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FeaturedJobListing