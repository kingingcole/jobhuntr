import React from 'react'

const JobDetailSalary = ({salary}) => {
    return (
        <p>
            <span><i className="fas fa-money-check"></i></span> {salary}
        </p>
    )
};

export default JobDetailSalary