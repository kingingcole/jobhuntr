import React, {Component, Fragment} from 'react';
import FeaturedJobListing from '../molecules/FeaturedJobListing'

class FeaturedOffersSection extends Component {
    render() {
        // let test_image = 'https://via.placeholder.com/150';
        let style = {
            boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #DBDAE9',
            margin: '20px auto',
            padding: '20px 0',
            paddingBottom: '0',
            background: '#FDFDFF',
            maxWidth: '750px'
        };
        let {featured} = this.props;
        let featuredJob;
        if (featured) {
            featuredJob = featured.map(job => {
                return (
                    <Fragment key={job.id}>
                        <FeaturedJobListing logo={job.company_logo} company={job.company_name} time={job.time}
                                            title={job.title} tags={job.tags} key={job.id} slug={job.slug}/>
                        <hr style={{margin: '0px'}}/>
                    </Fragment>
                )
            })
        }

        return (
            <Fragment>
                <h2 className="font-weight-bold text-center">Featured Offers</h2>
                <div style={style}>
                    <div className="featured-jobs-holder">

                        {featuredJob}

                    </div>
                </div>
            </Fragment>
        )
    }
};

export default FeaturedOffersSection