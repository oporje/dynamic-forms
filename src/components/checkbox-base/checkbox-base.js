import React from 'react';
import ErrorMessage from '../error-message/error-message';
import style from './check-base.module.css';

const CheckboxBase = ({field : { value, label, name, type, component}, setValue, errorMessages, validFields}) => {
    return (
        <div className={style.fieldWrapper}>
            <input
                id={name}
                className="form-control-number" 
                type="checkbox" 
                value={value} 
                onChange={(e) => setValue(name, e.target.checked)} 
            />
            { component.props.label && <label>{component.props.label}</label> }
            { errorMessages && validFields?.isOneOFCheck === false && <ErrorMessage message={errorMessages.required} /> }
            { errorMessages && validFields?.isOneOFCheck === false && <ErrorMessage message={errorMessages.oneOf} /> }
        </div>
    )
}

export default CheckboxBase;
