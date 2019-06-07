import React, {Fragment} from 'react';
import JobDetailTitle from '../atoms/JobDetailTitle'
import JobDetailType from '../atoms/JobDetailType'
import JobDetailCompany from '../atoms/JobDetailCompany'
import JobDetailCompanyWebsite from '../atoms/JobDetailCompanyWebsite'
import JobDetailLocation from '../atoms/JobDetailLocation'
import JobDetailSalary from '../atoms/JobDetailSalary'

const SJDS = ({title, company, website, type, location, city, salary}) => {
    return (
        <Fragment>
            <JobDetailTitle title={title}/>
            <JobDetailCompany company={company}/>
            <JobDetailCompanyWebsite website={website}/>
            <JobDetailType type={type}/>
            <JobDetailLocation location={location} city={city}/>
            <JobDetailSalary salary={salary}/>
        </Fragment>
    )
};

export default SJDS