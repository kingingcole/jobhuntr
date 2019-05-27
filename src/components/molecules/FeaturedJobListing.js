import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import CompanyLogo from '../atoms/CompanyLogo'
import Button from '../atoms/Button'
import Tags from '../atoms/Tags'

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
    transition            : '0.4s all',
    padding: '10px'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#root');

class FeaturedJobListing extends Component{

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

    render(){
        let {logo, company, title, time, slug, tags} = this.props;
        const job_url = `/job/${slug}`;
        let job_tags;
        if (tags) {
            job_tags = tags.map(tag => {
                return (
                    <Tags tag={tag.name} key={Math.random()}/>
                )
            })
        };
        let screenWidth = (window.screen.width);
        let modalImageSize;
        screenWidth < 375 ? (modalImageSize = '150px') : (modalImageSize = '300px');
        
        return (

            <div className='container-fluid' >
                <div className="row py-4" >
                    <div className=" col-md-6 col-sm-12">
                        <div className="row text-left">
                            <div className="col-4">
                                <span onClick={this.openModal} style={{cursor: 'pointer'}}>
                                    <CompanyLogo logo={logo} company={company} width='80px'/>
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

                            <div className="col-8">
                                <h4 className="font-weight-bold mb-1">
                                    <Link to={job_url}>
                                        {title}
                                    </Link>
                                </h4>
                                <span>{company}</span>
                                <small style={{opacity: '0.3', margin: '0px 12px'}}>{time}</small>
                                <div>
                                    {job_tags}
                                </div>
=======

const FeaturedJobListing = ({logo, company, title, time, slug, tags}) => {

    const job_url = `/job/${slug}`;
    let job_tags;
    if (tags) {
        job_tags = tags.map(tag => {
            return (
                <Tags tag={tag.name} key={Math.random()}/>
            )
        })
    }
    return (

        <div className='container-fluid' >
            <div className="row py-4" >
                <div className=" col-md-6 col-sm-12">
                    <div className="row text-left">
                        <div className="col-4">
                            <CompanyLogo logo={logo} company={company} width='80px'/>
                        </div>
                        <div className="col-8">
                            <h4 className="font-weight-bold mb-1">
                                <Link to={job_url}>
                                    {title}
                                </Link>
                            </h4>
                            <span>{company}</span>
                            <small style={{opacity: '0.3', margin: '0px 12px'}}>{time}</small>
                            <div>
                                {job_tags}
>>>>>>> 96db5f0b6b521c3d783e4ffc847da92c2c594b6f
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 my-auto">
                        <Link to={job_url}>
                            <Button className='apply-btn'  color='white'
                                    fontWeight='300'>APPLY
                                NOW</Button>
                        </Link>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 my-auto">
                    <Link to={job_url}>
                        <Button className='apply-btn' bgColor='rgba(108, 99, 255, 0.0980392)' color='rgb(132, 129, 180)'
                                fontWeight='300'>APPLY
                            NOW</Button>
                    </Link>
                </div>
            </div>
<<<<<<< HEAD
=======
        </div>
>>>>>>> 96db5f0b6b521c3d783e4ffc847da92c2c594b6f

        )
    }
}

export default FeaturedJobListing