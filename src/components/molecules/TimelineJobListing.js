import React, {Fragment} from 'react'
import CompanyLogo from '../atoms/CompanyLogo'
import {LazyLoadComponent} from 'react-lazy-load-image-component'
import {Link} from 'react-router-dom'


class TimelineJobListing extends React.Component{

	style={
		padding: '10px 20px',
		border: '1px solid rgb(219, 218, 233)',
		maxWidth: '960px',
		background:'white',
		borderRadius: '5px'
	}
	render() {
		let test_image = 'https://via.placeholder.com/150';
		let {company, title, logo, time, slug} = this.props;
		const job_url = `/job/${slug}`;

		// console.log(this.props);
		return(
				<LazyLoadComponent>
					<div className='row mx-auto my-2 job-listing' style={this.style}>
						<div className=" col-9 text-left">
							<h4 className='mb-0 ' style={{fontWeight:'500'}}>
								<Link to={job_url}>{title}</Link>
							</h4>
							<p className='my-1 d-inline mr-3 company'>{company}</p><small className='time-sm'>{time}</small>
						</div>
						<div className="col-3 text-right">
							<small className='time-md'>{time}</small>
						</div>
					</div>
				</LazyLoadComponent>
			)
	}
}

export default TimelineJobListing