import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import '../Assests/Styles/Login.css'

const Login = () => {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                errors.email = 'پر کردن این فیلد الزامی می باشد';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'لطفا یک ایمیل معتبر وارد نمایید';
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
                className='login inputEmail my-4'
           />
           {errors.email && touched.email && errors.email}
            <div className='inputpassword-div'>
                <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="کلمه عبور"
                    className='login inputPassword my-4'
                />
                {errors.password && touched.password && errors.password}
            </div>
            <div className="d-grid gap-2">
                <button 
                disabled={isSubmitting} 
                className='btn-submit p-2 text-light' 
                type='submit'>
                ورود</button>
            </div>
        </form>
        )}
        </Formik>
    )
}



export default Login;