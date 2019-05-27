import React from 'react'
import {LinkedinShareButton, LinkedinIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon} from 'react-share';

const SJSS = ({pageUrl, company_name, title}) => {
    const size = 50;
    const shareTitle = `Check out this open job position by ${company_name} - Jobhuntr.io \n ${title}`;
    const shareDescription = `Apply for this role now!`;
    const twitterHashtags = ['job', 'technology', 'opening', 'jobhuntr', 'jobhuntr.io'];

    return(
        <div className="row">
            <div className="col-12"  >
                <div className="row">
                    <div className="col-2">
                        <LinkedinShareButton url={pageUrl} title={shareTitle} description={shareDescription}>
                            <LinkedinIcon size={size} round={true} iconBgStyle={{fill:'transparent'}} logoFillColor='#0077B5'/>
                        </LinkedinShareButton>
                    </div>
                    <div className="col-10 my-auto">Share via LinkedIn</div>
                </div>
                <hr style={{margin: '4px'}}/>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-2">
                        <TwitterShareButton url={pageUrl} title={shareTitle} hashtags={twitterHashtags}>
                            <TwitterIcon size={size} round={true} iconBgStyle={{fill:'transparent'}} logoFillColor='#00acee'/>
                        </TwitterShareButton>
                    </div>
                    <div className="col-10 my-auto">Share on Twitter</div>
                </div>
                <hr style={{margin: '4px'}}/>
            </div>

            <div className="col-12">
                <div className="row">
                    <div className="col-2">
                        <EmailShareButton url={pageUrl} subject={shareTitle} >
                            <EmailIcon size={size}  round={true} iconBgStyle={{fill:'transparent'}} logoFillColor='#c3c3c3'/>
                        </EmailShareButton>
                    </div>
                    <div className="col-10 my-auto">Share on LinkedIn</div>
                </div>

            </div>

        </div>
    )
};


export default SJSS