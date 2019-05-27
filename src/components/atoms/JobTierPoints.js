import React from 'react'

const JobTierPoints = ({feature}) => {
    const pointStyle = {
        padding: 'auto 30px'
    };

    return (
        <div className="row">
            <span uk-icon="icon: check; ratio: 1.2" className="col-1 my-auto uk-icon"><svg width="24" height="24" viewBox="0 0 20 20"
                                                                                           xmlns="http://www.w3.org/2000/svg"
                                                                                           data-svg="check"><polyline fill="none"
                                                                                                                      stroke="#000"
                                                                                                                      strokeWidth="1.1"
                                                                                                                      points="4,10 8,15 17,4"/></svg></span>
            <p className="col-11 my-1" style={pointStyle}>{feature}</p>
        </div>
    )
};

export default JobTierPoints