import React from 'react';

const JobDetailResponsibilities = ({responsibilities}) => {
    return (
        <div>
            <h3 className="font-weight-bold">Job Responsibilities</h3>
            <p>{responsibilities}</p>
        </div>
    )
};

export default JobDetailResponsibilities