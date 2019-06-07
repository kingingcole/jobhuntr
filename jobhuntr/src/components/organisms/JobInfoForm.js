import React, {Component} from 'react';
import '../../css/job-info-form.css' //css file
import Button from '../atoms/Button' //button file
import CustomLoader from '../atoms/Loader' //custom loader file
import axios from 'axios'
import  BASE_API from '../../constants' //base API
import {Link} from 'react-router-dom'

// Imports for react-select
//Used in tags ibput field
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable';
import makeAnimated from 'react-select/lib/animated';

// Imports for Ck Editor
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const options = [
  { value: 'reactjs', label: 'React' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'front-end', label: 'Front-End' }
]

class JobInfoForm extends Component {

    state = {
        categories: []
    };

    handleReactSelectChange = (newValue: any, actionMeta: any) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };
    handleReactSelectInputChange = (inputValue: any, actionMeta: any) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    }

    componentDidMount() {
        let url = `${BASE_API}/categories`;
        axios.get(url)
            .then(res => {
                // console.log(res.data.data);
                this.setState({
                    categories: res.data.data
                })
            })
            .catch(err => {
                console.log(err.response)
            })
    }


    submitJobDetails = (e) => {
        e.preventDefault();
        let {nextStep} = this.props;
        nextStep();
    };

    render() {

        let {handleChange, values} = this.props;
        let {categories} = this.state;
        if (categories.length){
            var CategoryField = categories.map(category => {
                return (
                    <option value={category.id} key={category.id}>{category.name}</option>
                )
            })
        }
        return this.state.categories.length ? (
            <form className='job-info-form' onSubmit={this.submitJobDetails}>
                <div className="form-group">
                    <label htmlFor="job-title" className='input-label'>Job Title</label>  <small className="required">required</small>
                    <input type="text" className="form-control" id="job-title" aria-describedby="emailHelp"
                           placeholder="eg designer, front-end developer" onChange={(e) => handleChange('title', e.target.value)} required defaultValue={values.title}/>

                </div>


                

                <div className="form-group">
                    <label htmlFor="category" className='input-label'>Category</label>  <small className="required">required</small>
                    <select className="form-control" id='category' onChange={(e) => handleChange('category_id', e.target.value)} required>
                        {CategoryField}
                    </select>
                </div>

                <div className='form-group'>
                <label htmlFor="tags" className='input-label'>Tags</label>  <small className="required">required</small>

                <CreatableSelect
                    isClearable
                    components={makeAnimated()}
                    isMulti
                    onChange={this.handleReactSelectChange}
                    onInputChange={this.handleReactSelectInputChange}
                    options={options}
                />
                  </div>

                

                <div className="form-group">
                    <label htmlFor="type" className='input-label'>Job Type</label>  <small className="required">required</small>
                    <select className="form-control" id='salary' onChange={(e) => handleChange('type', e.target.value)} required>
                        <option>Full time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="salary" className='input-label'>Salary (per month, in USD)</label>  <small className="required">required</small>
                    <select className="form-control" id='salary' onChange={(e) => handleChange('salary', e.target.value)} required>
                        <option>500 - 1,000</option>
                        <option>1,000 - 2,000</option>
                        <option>2,000 - 3,000</option>
                        <option>3,000 - 4,000</option>
                        <option>4,000 - 5,000</option>
                        <option>Competitive</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="location" className='input-label'>Location</label>  <small className="required">required</small>
                    <input type="text" className="form-control" id="location" aria-describedby="emailHelp"
                           placeholder="eg United States, Nigeria" onChange={(e) => handleChange('location', e.target.value)} required defaultValue={values.location}/>

                </div>

                <div className="form-group">
                    <label htmlFor="city" className='input-label'>City</label>  <small className="required">required</small>
                    <input type="text" className="form-control" id="city" aria-describedby="emailHelp"
                           placeholder="eg Lagos, New York" onChange={(e) => handleChange('city', e.target.value)} required defaultValue={values.city}/>

                </div>

                <div className="form-group">
                    <label htmlFor="job-description" className='input-label'>Job Description</label>   <small className="required">required</small>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={values.description}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            // const data = editor.getData().replace(/^"(.+(?="$))"$/, '$1');
                            // console.log(data);
                            const job_description = editor.getData();
                            handleChange('description', job_description)
                        } }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="job-responsibilities" className='input-label'>Job Responsibilities</label>   <small className="required">required</small>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={values.responsibilities}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            // const data = editor.getData().replace(/^"(.+(?="$))"$/, '$1');
                            // console.log(data);
                            const job_resp = editor.getData();
                            handleChange('responsibilities', job_resp)
                        } }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="job-requirements" className='input-label'>Job Requirements</label>   <small className="required">leave blank if none</small>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={values.requirements}
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            // const data = editor.getData().replace(/^"(.+(?="$))"$/, '$1');
                            // console.log(data);
                            const job_req = editor.getData();
                            handleChange('requirements', job_req)
                        } }
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="apply-link" className='input-label'>Apply link</label>  <small className="required">required</small>
                    <input type="url" className="form-control" id="apply-link" aria-describedby="emailHelp"
                           placeholder="https://apl.ly; me@company.com" onChange={(e) => handleChange('apply_link', e.target.value)} required defaultValue={values.apply_link}/>

                </div>

                <div className='row'>
                    <div className="col-sm-12 col-md-6 text-md-right text-center my-2">
                        <Link to='/'>
                            <Button type='button' bgColor='rgba(108, 99, 255, 0.1)' color='#8481B4' className='btn' fontSize='0.875rem' fontWeight='500' padding='7px 37px'>CANCEL</Button>
                        </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 text-center text-md-left my-2">
                        <Button type='submit' bgColor='#6C63FF' color='white' className='btn' fontSize='0.875rem' fontWeight='500' padding='7px 37px'>NEXT</Button>
                    </div>
                </div>
            </form>
            ):(
            <CustomLoader />
        )
    }
};

export default JobInfoForm