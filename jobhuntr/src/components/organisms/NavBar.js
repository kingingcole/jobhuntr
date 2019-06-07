import React from 'react'
import {Link} from 'react-router-dom'
import LogoText from '../atoms/LogoText'
import '../../css/navbar.css'

const NavBar = () => {

	return (
			<nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
				<div className='container'>
                    <Link to='/'>
                        <span className="navbar-brand">
                            <LogoText mainColor='#6C63FF' ioColor='black' fontSize='1.625rem'/>
                        </span>
                    </Link>
				    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				    	<span className="navbar-toggler-icon"></span>
				    </button>
				    <div className="collapse navbar-collapse" id="navbarNav">
					    <ul className="navbar-nav ml-auto">
					        <li className="nav-item active">
					        	<a className="nav-link" href="/">Browse <span className="sr-only">(current)</span></a>
						    </li>
						    <li className="nav-item">
						        <a className="nav-link" href="#">Help</a>
						    </li>
						    <li className="nav-item">
                                <Link to='job/create'>
                                    <span className="nav-link">Post a job</span>
                                </Link>
					        </li>
					    </ul>
				    </div>
				</div>
			</nav>
		)
}

export default NavBar
