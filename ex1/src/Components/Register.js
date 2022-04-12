import React from 'react';
import '../Assests/Styles/Register.css';
import { useFormik } from 'formik';
import SubmitButton from './SubmitButton';
import { Form, FormControl } from 'react-bootstrap';
import {useState , useEffect} from 'react';


const Register = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            education: ['تحصیلات','کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکتری' , 'دیپلم'],
            educationSelected : ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
        console.log(formik.values.educationSelected)
 
      return (
        <form onSubmit={formik.handleSubmit}>
            <h5 className='text-light my-4'>رایگان ثبت نام کنید</h5>
            <div className='row'>
                <div className='col-6'>
                    <Form.Control
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        placeholder="نام خانوادگی" 
                        size='sm' 
                        className='register inputName' 
                    />
                </div>
                <div className='col-6'>
                    <Form.Control
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        placeholder="نام" 
                        size='sm' 
                        className='register inputLastName' 
                    />
                </div>    
            </div>    
            <Form.Select
                aria-label="Default select example"
                id='education'
                name="educationSelected"
                value={formik.values.educationSelected}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='register my-4' 
            >
                {formik.values.education.map((item,idx) => (
                    <option value={item} label={item}>{item}</option>
                ))}
            </Form.Select>
            {formik.values.educationSelected.value !== 'تحصیلات' && <Form.Control 
                size='sm' 
                className= 'register inputeducation my-4'
                type="text" 
                placeholder="محل تحصیل" 
            />}
        </form>
    );
}



export default Register;