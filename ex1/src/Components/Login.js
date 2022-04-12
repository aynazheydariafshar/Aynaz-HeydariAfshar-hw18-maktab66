import {useState} from 'react';
import {FaEye , FaEyeSlash} from 'react-icons/fa';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import '../Assests/Styles/Login.css';
import SubmitButton from './SubmitButton';

const Login = () => {

    const eye = <FaEye />;
    const noteye = <FaEyeSlash />;

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
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
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}
        >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
        <form className='p-4' onSubmit={handleSubmit}>
           <h5 className='text-light my-4'>خوش آمدید</h5>
           <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder = "پست الکترونیکی"
                className='login inputEmail my-1'
           />
            <p className='error'>{errors.email && touched.email && errors.email}</p>
            <div className='inputpassword-div'>
                <Form.Control
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="کلمه عبور"
                    className='login inputPassword my-1'
                />
                <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : noteye }</i>
                <p className='error'>{errors.password && touched.password && errors.password}</p>
            </div>   
            <div className="d-grid gap-2">
                <a href="#" class="link-forget mb-3">فراموش کردید ؟</a>
                <SubmitButton title={'ورود'} disabledbtn={isSubmitting}/>
            </div>   
        </form>
        )}
        </Formik>
    )
}



export default Login;