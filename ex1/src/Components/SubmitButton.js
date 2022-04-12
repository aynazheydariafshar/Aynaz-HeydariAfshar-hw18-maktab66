import React from 'react';
import '../Assests/Styles/SubmitButton.css'

const SubmitButton = ({title , disabledbtn}) => {
    return <button className='btn-submit mt-3 p-2 text-light' type='submit' disabled={disabledbtn}>{title}</button>
}


export default SubmitButton;