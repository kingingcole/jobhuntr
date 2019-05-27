import React, {Fragment} from 'react'
import CompanyLogo from '../atoms/CompanyLogo'
import {Link} from 'react-router-dom'

<<<<<<< HEAD
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    transition   		  : '0.4s all',
    padding: '10px'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class PromotedJobListing extends React.Component{
	 
  state = {
	  modalIsOpen: false
  };
 
  openModal = () => {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    return null
  }
 
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
=======

class PromotedJobListing extends React.Component{
>>>>>>> 96db5f0b6b521c3d783e4ffc847da92c2c594b6f

	style={
		padding: '10px 20px',
		border: '1px solid rgb(219, 218, 233)',
		maxWidth: '960px',
		background:'rgb(219, 218, 233)',
<<<<<<< HEAD
		borderRadius: '5px',
	}
	render() {
		let screenWidth = (window.screen.width);
		let modalImageSize;
		screenWidth < 375 ? (modalImageSize = '150px') : (modalImageSize = '300px');
=======
		borderRadius: '5px'
	}
	render() {
>>>>>>> 96db5f0b6b521c3d783e4ffc847da92c2c594b6f
		let test_image = 'https://via.placeholder.com/150';
		let {company, title, logo, slug} = this.props;
		const job_url = `/job/${slug}`;
		return(
<<<<<<< HEAD
				<div className='row mx-auto my-2 listing' style={this.style}>
=======
				<div className='row mx-auto my-2' style={this.style}>
>>>>>>> 96db5f0b6b521c3d783e4ffc847da92c2c594b6f
					<div className=" col-9 text-left">
						<h4 className='mb-0 ' style={{fontWeight:'500'}}>
							<Link to={job_url}>{title}</Link>
						</h4>
						<p className='my-1 d-inline mr-3 company'>{company}</p><small><i>Promoted</i></small>
					</div>
					<div className="col-3 text-right">
<<<<<<< HEAD
						<span onClick={this.openModal} style={{cursor: 'pointer'}}>
							<CompanyLogo logo={logo} borderRadius='50%' width='50px' marginLeft='auto' company={company}/>
						</span>
					</div>

					<Modal
			          isOpen={this.state.modalIsOpen}
			          onAfterOpen={this.afterOpenModal}
			          onRequestClose={this.closeModal}
			          style={customStyles}
			          contentLabel="Example Modal"
			        >
			 			<div className=''>
			 				<p style={{maxWidth: modalImageSize, margin: 'auto', color: 'rgb(108, 99, 255)'}}>{company.length >=13 ? (company.slice(0,13) + '...'):(company)}</p>
			 				<CompanyLogo logo={logo} borderRadius='50%' width={modalImageSize} marginLeft='auto' company={company}/>
			 			</div>
			          
			        </Modal>
=======
						<CompanyLogo logo={logo} borderRadius='50%' width='50px' marginLeft='auto' company={company}/>
					</div>
>>>>>>> 96db5f0b6b521c3d783e4ffc847da92c2c594b6f
				</div>
			)
	}
}

export default PromotedJobListing