import React from 'react';
import ErrorMessage from '../error-message/error-message';
import style from './password-input.module.css';

const PasswordField = ({field: { value, label, name }, setValue, errorMessages, validFields}) => {
    return (
        <div className={style.fieldWrapper}>
            {label && <label>{label}</label>}
            <input
                id={name}
                value={value}
                type="password"
                onChange={(e) => setValue(name, e.target.value)}
            />
            { errorMessages && validFields?.isRequiredCheck === false && <ErrorMessage message={errorMessages.required} />}
        </div>
    )
}

export default PasswordField;
