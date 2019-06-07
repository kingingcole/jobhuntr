import React from 'react';

const JobDetailDescription = ({description}) => {
    return (
        <div>
            <h3 className='font-weight-bold'>About Job Offer</h3>
            <p>{description}</p>
        </div>
    )
};

export default JobDetailDescription