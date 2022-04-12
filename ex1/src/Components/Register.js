import React from 'react';
import '../Assests/Styles/Register.css';
import { useFormik } from 'formik';
import SubmitButton from './SubmitButton';
import { Form } from 'react-bootstrap';
import {useState , useEffect} from 'react';
import {FaEye , FaEyeSlash} from 'react-icons/fa'
import '../Assests/Styles/Login.css';



const Register = () => {

    //eye icon for password
    const eye = <FaEye />;
    const noteye = <FaEyeSlash />;

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    //values formik
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            education: ['کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکتری' , 'دیپلم'],
            educationSelected : 'choose',
            city : 'chooseCity',
            state : 'chooseState',
            email : '',
            password : ''
        },

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },

        //check validation
        validate : values => {
            const errors = {};

            //handle email error
            if (!values.email) {
            errors.email = 'پر کردن این فیلد الزامی می باشد';
            } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
            errors.email = 'لطفا یک ایمیل معتبر وارد نمایید';
            }
    
            //handle password error
            if(!values.password) {
                errors.password = 'پر کردن این فیلد الزامی می باشد'
            }else if(values.password.length < 6){
                errors.password = 'رمز عبوری امن تر با حداقل 6 کاراکتر انتخاب کنید'
            }
            return errors;
        }
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
        });
    };
    
    useEffect(() => {
        fetchData();
    }, []);
   
    
      return (
        <form className='p-4' onSubmit={formik.handleSubmit}>
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
                <SubmitButton title={'ثبت نام'}/>  
            </div>
        </form>
    );
}



export default Register;