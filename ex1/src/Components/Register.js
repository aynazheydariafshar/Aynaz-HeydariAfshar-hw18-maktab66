import React from 'react';
import '../Assests/Styles/Register.css';
import { useFormik } from 'formik';
import SubmitButton from './SubmitButton';
import { Form, FormControl } from 'react-bootstrap';
import {useState , useEffect} from 'react';
import yup from 'formik-yup'


const Register = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            education: ['کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکتری' , 'دیپلم'],
            educationSelected : 'choose',
            city : 'chooseCity',
            state : 'chooseState'
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const [data , setData] = useState([])

    const validate = (values) => {

    }

    
    const fetchData = () => {
        fetch('/json/iranstates.json')
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            alert('error from data')
        });
    };
    
    useEffect(() => {
        fetchData();
    }, []);
   
    
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
                name="educationSelected"
                value={formik.values.educationSelected}
                onChange={formik.handleChange}
                className='register my-4' 
            >
                <option value={'choose'}>تحصیلات</option>
                {formik.values.education.map((item,idx) => (
                    <option value={item}>{item}</option>
                ))}
            </Form.Select>
            {formik.values.educationSelected !== 'choose' && <Form.Control 
                size='sm' 
                className= 'register inputeducation my-4'
                type="text" 
                placeholder="محل تحصیل" 
            />}
            <div className='row'>
                <div className='col-6'>
                    <Form.Select 
                        name = 'city'
                        className='register selectEducation' 
                        as="select"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                    >
                        <option value={'chooseCity'}>شهرستان</option>
                        {data[formik.values.state] !== undefined && data[formik.values.state].map(item => (
                            <option value={item}>{item}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className='col-6'>
                    <Form.Select 
                        name = 'state'
                        className='register selectEducation' 
                        as="select"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                    >
                        <option value={'chooseState'}>استان</option>
                        {Object.keys(data).map(item => (
                            <option value={item}>{item}</option>
                        ))}
                    </Form.Select>
                </div>
            </div>    
        </form>
    );
}



export default Register;