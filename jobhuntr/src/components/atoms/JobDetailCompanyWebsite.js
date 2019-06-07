import React from 'react';

const JobDetailCompanyWebsite = ({website}) => {
    return(
        <p>
            <span><i className="fas fa-globe"></i></span> <a target='_blank' rel='noopener noreferrer' href={website}>Visit company website</a>
        </p>
    )
};

export default JobDetailCompanyWebsite