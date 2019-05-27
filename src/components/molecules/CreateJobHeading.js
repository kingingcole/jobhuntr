import  React from 'react'

const CreateJobHeading = () => {

    const headingStyle = {
        fontSize: '2.25rem',
        fontWeight: 800,
        color: '#020021',

    };

    return (
        <h1 className="text-center" style={headingStyle}>
            Create Job Offer
        </h1>
    )
};

export default CreateJobHeading