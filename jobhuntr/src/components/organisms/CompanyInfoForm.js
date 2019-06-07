import React, {Component} from 'react';
import '../../css/job-info-form.css'
import Button from '../atoms/Button'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class CompanyInfoForm extends Component {

    submitCompanyDetails = (e) => {
        e.preventDefault();
        let {nextStep} = this.props;
        nextStep();
    };

    handleLogoChange = (e) => {
        e.preventDefault();
        this.props.handleChange('company_logo', e.target.files[0])
    }

    render() {
        let {handleChange, values, prevStep} = this.props;
        return (
            <form className='job-info-form' onSubmit={(e) => this.submitCompanyDetails(e)}>
                <div className="form-group">
                    <label htmlFor="company-name" className='input-label'>Company Name</label>
                    <small className="required">required</small>
                    <input type="text" className="form-control" id="company-name" aria-describedby="emailHelp"
                           placeholder="" required onChange={(e) => handleChange('company_name', e.target.value)} defaultValue={values.company_name}/>

                </div>

                <div className="form-group">
                    <label htmlFor="company-logo" className='input-label'>Company Logo</label>
                    <small className="required">required</small>
                    <br/>
                    <input type="file"
                           id="company-logo"
                           accept="image/png, image/jpeg" required onChange={(e) => this.handleLogoChange(e)}/>

                </div>
                <div className="form-group">
                    <label htmlFor="company_email" className='input-label'>Company Email</label>
                    <small className="required">required (for invoicing only)</small>
                    <input type="email" className="form-control" id="company_email" aria-describedby="emailHelp"
                           placeholder="apply@company.com" required onChange={(e) => handleChange('email', e.target.value)} defaultValue={values.email}/>

                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="url" className='input-label'>URL</label>
                            <small className="required">required</small>
                            <input type="url" className="form-control" id="url" aria-describedby="emailHelp"
                                   placeholder="https://company.com" required onChange={(e) => handleChange('company_url', e.target.value)} defaultValue={values.company_url}/>

                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="twitter" className='input-label'>Twitter</label>
                            <small className="required">leave blank if none</small>
                            <input type="url" className="form-control" id="twitter" aria-describedby="emailHelp"
                                   placeholder="https://twitter.com/company" required onChange={(e) => handleChange('company_twitter', e.target.value)} defaultValue={values.company_twitter}/>

                        </div>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="company-tagline" className='input-label'>Company Tagline</label>
                    <small className="required">leave blank if none</small>
                    <CKEditor
                        editor={ClassicEditor}
                        data={values.company_tagline}
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            // const data = editor.getData().replace(/^"(.+(?="$))"$/, '$1');
                            // console.log(data);
                            const company_tagline = editor.getData();
                            handleChange('company_tagline', company_tagline)
                        }}
                    />
                </div>

                <div className='row'>
                    <div className="col-sm-12 col-md-6 text-md-right text-center my-2">
                        <span onClick={prevStep}>
                            <Button bgColor='rgba(108, 99, 255, 0.1)' color='#8481B4' className='btn' fontSize='0.875rem'
                                    fontWeight='500' padding='7px 37px'>BACK</Button>
                        </span>
                    </div>
                    <div className="col-sm-12 col-md-6 text-center text-md-left my-2">
                        <Button type='submit' bgColor='#6C63FF' color='white' className='btn' fontSize='0.875rem'
                                fontWeight='500' padding='7px 37px'>NEXT</Button>
                    </div>
                </div>

            </form>
        )
    }
};

export default CompanyInfoForm