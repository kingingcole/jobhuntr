import React from 'react'

const JobDetailLocation = ({location, city}) => {
    let full_location = `${city} , ${location}`

    return(
        <p>
            <span><i className="fas fa-map-marker-alt"></i></span> {full_location}
        </p>
    )
};

export default JobDetailLocation