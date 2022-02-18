import React from 'react';
import ErrorMessage from '../error-message/error-message';
import style from './text-input.module.css';

const TextInput = ({field : { value, label, name, type}, setValue, errorMessages, validFields}) => {
    return (
        <div className={style.fieldWrapper}>
            {label && <label className="label-input">{label}</label>}
            <input
                id={name}
                value={value}
                type={type}
                onChange={(e) => setValue(name, e.target.value)}
            />
            { errorMessages && (validFields?.isRequiredCheck  === false) && <ErrorMessage message={errorMessages.required} />}
            { errorMessages && (validFields?.isRequiredCheck === true) && (validFields?.isFormatCheck  === false) && <ErrorMessage message={errorMessages.format} />}
        </div>
    )
}

export default TextInput;
