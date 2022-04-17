import React from 'react';
import '../Assests/Styles/Register.css';
import { useFormik } from 'formik';
import SubmitButton from './SubmitButton';
import { Form, Spinner } from 'react-bootstrap';
import {useState , useEffect} from 'react';
import {FaEye , FaEyeSlash} from 'react-icons/fa'
import '../Assests/Styles/Login.css';
import * as Yup from 'yup';
import axios from 'axios';



const Register = () => {

    //eye icon for password
    const eye = <FaEye />;
    const noteye = <FaEyeSlash />;

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    //spinner 
    const[isloaded , setisloaded] = useState(false);

    //education option
    const education = ['کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکتری' , 'دیپلم']

    //values formik
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            educationSelected : '',
            city : '',
            state : '',
            email : '',
            password : '',
            locationEducation : '',
        },

        onSubmit: async(values) => {
            axios.post('http://localhost:8000/users' , values)
        },

        //check validation
        validationSchema : Yup.object().shape({
            firstName : Yup.string().required('پر کردن این فیلد الزامی می باشد'),
            lastName : Yup.string().required('پر کردن این فیلد الزامی می باشد'),
            city : Yup.string().required('پر کردن این فیلد الزامی می باشد'),
            state : Yup.string().required('پر کردن این فیلد الزامی می باشد'),
            email : Yup.string().email('لطفا یک ایمیل معتبر وارد نمایید').required('پر کردن این فیلد الزامی می باشد'),
            password : Yup.string().min(6 , 'رمز عبوری امن تر با حداقل 6 کاراکتر انتخاب کنید').required('پر کردن این فیلد الزامی می باشد'),
            // locationEducation : Yup.string().when('educationSelected' , {
            //     is: (value) => value !== undefined,
            //     then: Yup.string().required("پر کردن این فیلد الزامی می باشد"),
            // })
        })
    });

    //data city and state from jsonfile
    const [data , setData] = useState([])

    //get data from json file
    const fetchData = () => {
        fetch('/json/iranstates.json')
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            alert('error from data')
        })
        .finally(setisloaded(true))
    };
    
    useEffect(() => {
        fetchData();
    }, []);
   
    
      return (<>
        {isloaded ? <form className='p-4' onSubmit={formik.handleSubmit}>
            <h5 className='text-light mb-3'>رایگان ثبت نام کنید</h5>
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
                    <p className='error mt-2'>{formik.errors.firstName && formik.touched.firstName && formik.errors.firstName}</p>
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
                    <p className='error mt-2'>{formik.errors.lastName && formik.touched.lastName && formik.errors.lastName}</p>
                </div>    
            </div>    
            <Form.Select
                aria-label="Default select example"
                name="educationSelected"
                value={formik.values.educationSelected}
                onChange={formik.handleChange}
                className='register my-4' 
            >
                <option value=''>تحصیلات</option>
                {education.map(item => (
                    <option value={item}>{item}</option>
                ))}
            </Form.Select>
            {formik.values.educationSelected !== '' &&
            <div>
                <Form.Control 
                    name='locationEducation'
                    size='sm' 
                    className= 'register inputeducation'
                    type="text" 
                    placeholder="محل تحصیل" 
                    onChange={formik.handleChange}
                    value={formik.values.locationEducation}
                />
                <p className='error mt-2'>{formik.errors.locationEducation && formik.touched.locationEducation && formik.errors.locationEducation}</p>
            </div>}
            <div className='row'>
                <div className='col-6'>
                    <Form.Select 
                        name = 'city'
                        className='register selectEducation' 
                        as="select"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                    >
                        <option value={''}>شهرستان</option>
                        {data[formik.values.state] !== undefined && data[formik.values.state].map(item => (
                            <option value={item}>{item}</option>
                        ))}
                    </Form.Select>
                    <p className='error mt-2'>{formik.errors.city && formik.touched.city && formik.errors.city}</p>
                </div>
                <div className='col-6'>
                    <Form.Select 
                        name = 'state'
                        className='register selectEducation' 
                        as="select"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                    >
                        <option value={'notchooseState'}>استان</option>
                        {Object.keys(data).map(item => (
                            <option value={item}>{item}</option>
                        ))}
                    </Form.Select>
                    <p className='error mt-2'>{formik.errors.state && formik.touched.state && formik.errors.state}</p>
                </div>
            </div>  
            <Form.Control
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder = "پست الکترونیکی"
                className='login inputEmail mt-4'
            />
            <p className='error mt-2'>{formik.errors.email && formik.touched.email && formik.errors.email}</p>
            <div className='inputpassword-div'>
                <Form.Control
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="کلمه عبور"
                    className='login inputPassword'
                />
                <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : noteye }</i>
                <p className='error mt-2'>{formik.errors.password && formik.touched.password && formik.errors.password}</p>
            </div>  
            <div className="d-grid">
                <SubmitButton title={'ثبت نام'} disabledbtn = {formik.isSubmitting}/>  
            </div>
        </form> : <Spinner />}
    </>);
}



export default Register;