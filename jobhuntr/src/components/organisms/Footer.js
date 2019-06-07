import React from 'react';
import '../../css/footer.css'
import LogoText from '../atoms/LogoText'
import Button from '../atoms/Button'
import {Link} from 'react-router-dom';

const Footer = () => {
	return (
			<section className='footer'>
				<div className='container'>
					<div className='row'>
						<div className='col-12 col-md-6 col-lg-4 footer-section mx-auto'>
							<Link to='/'>
								<LogoText mainColor='#DBDAE9' ioColor='#B4AFFF' fontSize='21px'/>
							</Link>
							<p className='copyright'>
								Copyright 2019. All rights reserved.
							</p>
							<div className='social-section'>
								<div className='social'>
									<a href="#"><i className="fab fa-slack"></i></a>
								</div>
								<div className='social'>
									<a href="#"><i className="fab fa-twitter"></i></a>
								</div>
								<div className='social'>
									<a href="#"><i className="fab fa-linkedin-in"></i></a>
								</div>
								<div className='social'>
									<a href="#"><i className="fab fa-facebook-square"></i></a>
								</div>
								<div className='social'>
									<a href="#"><i className="fab fa-medium"></i></a>
								</div>
							</div>
						</div>
						<div className='col-12 col-md-6 col-lg-4 footer-section mx-auto'>
							<p className='resources'>RESOURCES</p>
							<p>Lorem ipsum is simply</p>
							<p>Lorem ipsum is simply</p>
							<p>Lorem ipsum is simply</p>
						</div>
						<div className='col-12 col-md-6 col-lg-4 text-left footer-section'>
							<p>3,456 jobs posted</p>
							<p>123,456 subscribers</p>
							<Link to='/job/create'>
								<Button className='footer-btn btn' bgColor='white' color='#6C63FF' fontSize='0.875rem' padding='7px 30px' fontWeight='bold'>POST A JOB</Button>
							</Link>

							<Link to='/subscribe'>
								<p>or subscribe</p>
							</Link>
						</div>
					</div>
				</div>
			</section>
		)
}

export default Footer