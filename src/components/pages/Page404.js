import React, {Component} from 'react'
import { ReactComponent as Logo } from '../../svg/404.svg';
import Button from '../atoms/Button'
import {Link} from "react-router-dom";
import { Helmet } from 'react-helmet';

class Page404 extends Component{



    render(){
        return(
            <section>
                <div className="container">
                    <Helmet>
                        <title>Resource not found - Jobhuntr.io</title>
                        <meta name="description" content="404 page not found" />
                    </Helmet>
                    <div className="row">
                        <div className="col-12 text-center">
                            <Logo/>
                            <p className='muted'>We do not think what you find is here.</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-sm-12 col-md-6 text-md-right text-center my-2">
                            <Link to='/'>
                                <Button type='button' bgColor='rgba(108, 99, 255, 0.1)' color='#8481B4' className='btn' fontSize='0.875rem' fontWeight='500' padding='7px 37px'>GO HOME</Button>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-6 text-center text-md-left my-2">
                            <Link to='/job/create'>
                                <Button type='button' bgColor='#6C63FF' color='white' className='btn' fontSize='0.875rem' fontWeight='500' padding='7px 37px'>POST A JOB</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center mt-2">
                            <p style={{fontSize:'0.75em'}}>or you can <Link to='/subscribe' style={{color:'#6C63FF'}}>subscribe</Link> to receive first-hand email of freshly posted jobs you might like.</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Page404;