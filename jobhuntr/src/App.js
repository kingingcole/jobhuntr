import React, {Component} from 'react';
import './uikit/css/uikit.min.css'
import './uikit/css/uikit-rtl.min.css'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import NavBar from './components/organisms/NavBar'
import Footer from './components/organisms/Footer'
import CreateJob from './components/pages/CreateJob'
import SingleJobDetail from './components/pages/SingleJobDetail'
import Page404 from './components/pages/Page404'
import Index from './components/pages/Index'
import Subscribe from './components/pages/Subscribe'
import ScrollToTop from './components/atoms/ScrollToTop'
import CreateJob3 from './components/pages/CreateJob3'
import Payment from './components/pages/Payment'
import TagJobs from './components/pages/TagJobs'
import JobSubmitted from "./components/pages/JobSubmitted";

class App extends Component {
    render() {
        return (
            <Router>
                <ScrollToTop>
                    <div className="App">
                        <NavBar/>
                        <Switch>
                            <Route exact path='/' component={Index}/>
                            <Route exact path='/subscribe' component={Subscribe}/>
                            <Route exact path='/tag/:tag' component={TagJobs}/>
                            <Route exact path='/job/create' component={CreateJob}/>
                            <Route exact path='/job/create3' component={CreateJob3}/>
                            <Route exact path='/pay' component={Payment}/>
                            <Route exact path='/job/:slug' component={SingleJobDetail}/>
                            <Route exact path='/job/create/success' component={JobSubmitted}/>
                            <Route component={Page404}/>
                        </Switch>
                        <Footer/>
                    </div>
                </ScrollToTop>
            </Router>
        );
    }
};

export default App;
