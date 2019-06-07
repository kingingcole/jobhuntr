import React, {Component} from 'react';
import axios from 'axios'
import BASE_API from '../../constants'
import TimelineJobListing from '../molecules/TimelineJobListing'
import CustomLoader from '../atoms/Loader'
import { Helmet } from 'react-helmet';

class TagJobs extends Component{

	state={
		jobs: []
	}

	componentDidMount(){
		let {tag} = this.props.match.params;
		let url = `${BASE_API}/tags/${tag}`;
		axios.get(url)
			.then(res => {
				console.log(res.data);
				this.setState({jobs: res.data.data})
			})
			.catch(err => {
				err.response ? console.log(err.response) : console.log(err)
			})
	}

	render(){
		let {tag} = this.props.match.params;
		let {jobs} = this.state;
		let title = `${tag.toUpperCase()} Jobs - Jobhuntr.io`;
		let desc = `All remote and non-remote ${tag} jobs.`
		jobs.length ? console.log(jobs) : console.log('no job');
		
		const jobs_section = jobs.length ? (
                jobs.map(job => {
                	return(
                			<TimelineJobListing company={job.company_name} title={job.title} logo={job.company_logo} slug={job.slug} time={job.time} key={job.id}/>
                		)
                })
            ) : (<CustomLoader/>);
		return(
				<section>
					<div className='container'>
						<Helmet>
	                        <title>{title}</title>
	                        <meta name="description" content={desc} />
	                    </Helmet>
						<div className='row text-center'>
                           <div className='col-12'>
                           		<h2 style={{fontWeight: '800'}}>All <span style={{color:'rgb(108, 99, 255)'}}>{tag}</span> jobs</h2>
                           </div>
                           <div className='col-12'>
                           		{jobs_section}
                           </div>
						</div>
					</div>
				</section>
			)
	}
}

export default TagJobs