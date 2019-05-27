import React from 'react';

const JobDetailRequirements = ({requirements}) => {
    return (
        <div>
            <h3 className="font-weight-bold">Job Requirements</h3>
            <p>{requirements}</p>
        </div>
    )
};

export default JobDetailRequirements