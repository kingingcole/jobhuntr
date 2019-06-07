import React, {Component} from 'react';

class SingleJob extends Component{
    render(){
        let {company, title} = this.props.match.params;
        console.log(company, title)
        return (
            <div className="container">
                <section className="py-4">
                    <ion-icon name="briefcase"></ion-icon>
                    <i className="fas fa-briefcase"></i>
                </section>
            </div>
        )
    }
};

export default SingleJob