import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import '../../css/submitted.css'

class JobSubmitted extends Component {

    render() {
        return(
            <div className="container text-center">
                <Helmet>
                    <title>Job Submitted - Jobhuntr.io</title>
                </Helmet>
                <div className="row">
                    <div className="col-12 submitted">
                        <i className="fas fa-check"></i>
                        <h1>Job offer submitted!</h1>
                        <p>Your offer will go live in a few minutes. <br/> Further details about your offer can be found in your email.</p>
                    </div>
                </div>
            </div>

        )
    }
};

export default JobSubmitted