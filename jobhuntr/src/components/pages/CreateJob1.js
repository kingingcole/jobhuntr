import React, {Component} from 'react';
import CreateJobHeading from '../molecules/CreateJobHeading'
import CreateJobProgress from '../molecules/CreateJobProgress'
import JobInfoForm from '../organisms/JobInfoForm'
import '../../css/create-job1.css'


class CreateJob1 extends Component {

    componentDidMount() {
        document.title = 'Create Job (Job Information)- JobHuntr.io'
    }

    render() {
        let {nextStep, handleChange, values, setCategory, setSalary, step} = this.props;
        return (
            <section className="job-info">
                <div className="container">
                    <CreateJobHeading/>
                    <div className="create-job-body mx-auto">
                        <CreateJobProgress progress='Job Information' step={step} />
                        <JobInfoForm
                            nextStep={nextStep}
                            handleChange={handleChange}
                            values={values}
                            setCategory={setCategory}
                            setSalary={setSalary}
                        />
                    </div>
                </div>
            </section>
        )
    }
}

export default CreateJob1