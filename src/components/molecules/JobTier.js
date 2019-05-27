import React from 'react'
import JobTierPoints from '../atoms/JobTierPoints'
import '../../css/job-tier.css'

const JobTier = ({name, features, price, id, setPrice, handleChange}) => {
    const tierPoints = features.map(feature => {
        return <JobTierPoints feature={feature} key={Math.random()}/>
    });
    const handleTierSelection = () => {
        setPrice(price);
        handleChange('tier_id', id);
    };

    return (
        <div className="tier col-sm-12 col-md-4 my-3" onClick={handleTierSelection}>
            <div className="row">
                <h4 className="font-weight-bold col-12 text-center">
                    {name}
                </h4>
            </div>
            <div className="tier-points">
                {tierPoints}
            </div>
            <p className="text-right mb-0 font-weight-bold">
                ${price}
            </p>
        </div>
    )
};

export default JobTier