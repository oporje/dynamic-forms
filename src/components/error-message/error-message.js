import React from 'react';
import style from './error-message.module.css';

const ErrorMessage = (props) => {
    const { message } = props;
    return (<p className={style.errorMessage}>{message}</p>)
}

export default ErrorMessage;
