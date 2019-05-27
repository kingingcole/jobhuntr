import React from 'react';
import '../../css/create-job-progress.css'

const CreateJobProgress = ({step, progress}) => {

    // const countStyle = {
    //     background: '#6C63FF',
    //     padding: '10px',
    //     borderRadius: '30px',
    //     color: 'white',
    // };
    return (
        <div>
            <h5 className="font-weight-bold">{step}/3 - {progress}</h5>
            <hr/>
        </div>
    )
};

export default CreateJobProgress

//
// <div className="row">
//     <div className="col-12 col-md-4">
//     <div className="row">
//     <div className="col-12 col-md-2">
//     <span className="progress-count" style={countStyle}>1</span>
// </div>
// <div className="col-12 col-md-10">
//     <p className="progress-text">Job Information</p>
// </div>
// </div>
// </div>
// <div className="col-12 col-md-4">
//     <div className="row">
//     <div className="col-12 col-md-2">
//     <span className="progress-count" style={countStyle}>2</span>
// </div>
// <div className="col-12 col-md-10">
//     <p className="progress-text">Company Information</p>
// </div>
// </div>
// </div>
// <div className="col-12 col-md-4">
//     <div className="row">
//     <div className="col-12 col-md-2">
//     <span className="progress-count" style={countStyle}>3</span>
// </div>
// <div className="col-12 col-md-10">
//     <p className="progress-text">Payment</p>
// </div>
// </div>
// </div>
// </div>