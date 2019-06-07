import React, {Component} from 'react';
import CreateJobHeading from '../molecules/CreateJobHeading'
import CreateJobProgress from '../molecules/CreateJobProgress'
import CompanyInfoForm from '../organisms/CompanyInfoForm'
import '../../css/create-job1.css'


class CreateJob2 extends Component {

    componentDidMount() {
            document.title = 'Create Job (Company Information)- JobHuntr.io'
    }

    render() {
        let {nextStep, prevStep, values, handleChange, step} = this.props;
        return (
            <section className="job-info">
                <div className="container">
                    <CreateJobHeading/>
                    <div className="create-job-body mx-auto">
                        <CreateJobProgress progress='Company Information' step={step}/>
                        <CompanyInfoForm nextStep={nextStep} prevStep={prevStep} values={values} handleChange={handleChange}/>
                    </div>
                </div>
            </section>
        )
    }
}

export default CreateJob2