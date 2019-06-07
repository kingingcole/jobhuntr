import React, {Fragment} from 'react';
import PromotedJobListing from '../molecules/PromotedJobListing'
import TimelineJobListing from '../molecules/TimelineJobListing'

class OtherOffersSection extends React.Component {

    render() {
        let {promoted, timeline} = this.props;
        let promotedJobs, timelineJobs;
        if (promoted) {
            promotedJobs = promoted.map(job => {
                return(
                    <PromotedJobListing company={job.company_name} title={job.title} logo={job.company_logo} slug={job.slug} key={job.id}/>
                )
            })
        };
        if (timeline) {
            timelineJobs = timeline.map(job => {
                return(
                    <TimelineJobListing company={job.company_name} title={job.title} logo={job.company_logo} slug={job.slug} time={job.time} key={job.id}/>
                )
            })
        }
        return (
            <div className='my-5'>
                {promotedJobs}
                {timelineJobs}
            </div>
        )
    }
}

export default OtherOffersSection