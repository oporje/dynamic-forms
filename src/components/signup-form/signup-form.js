import React, { useEffect, useState } from 'react';
import CheckboxBase from '../checkbox-base/checkbox-base';
import PasswordInput from '../password-input/password-input';
import TextInput from '../text-input/text-input';
import InputJson from './../../dynamic-form';
import style from './signup-form.module.css'

const SignUp = () => {
    const {sections, validation} = InputJson;
    const [formFields, setFormFields] = useState({});
    const [validFields, setValidFields] = useState({});
    const [formValid, setFormValid] = useState(false);
    // readymade regex for email validation
    const emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/);

    // processing object of fields 
    const fieldDetails = sections[0].fields.reduce((prevObject, {name, type}) => {
        const {type: schemaType, format, oneOf, required} = validation?.schema?.properties[name];
        const {required: errorRequired, format: errorFormat, oneOf: errorOneOf} = validation?.config?.errMessages?.[name];

        return {
            ...prevObject,
            [name]: {
                ...(type && { type: type }),
                validations: {
                    isRequired: required,
                    schemaType: schemaType,
                    ...(format && {format: format}),
                    oneOf: oneOf,
                },
                errormessage: {
                    required: errorRequired,
                    ...(errorFormat && {format: errorFormat}),
                    ...(errorOneOf && {oneOf: errorOneOf}),
                }
            }
        };

    }, {});

    // create form using dynamic json
    const initForm = () => {
        const fieldInfo = Object.keys(sections[0].fields).reduce((prevObj, key) => {
            const {name, component, label, type} = sections[0].fields[`${key}`];
            const {type: schemaType} = validation?.schema?.properties[name];

            return {
                ...prevObj,
                [name]: {
                    value: schemaType === 'boolean' ? false : '',
                    component: component,
                    label: label,
                    name: name,
                    ...(type && { type: type }),
                }
            };

        }, {});
        setFormFields(fieldInfo);
    }

    useEffect(() => {
        initForm();
    }, []);

    // handle form change
    const handleFormChange = (name, value) => {
        setFormFields({
            ...formFields,
            [name]: {
                ...formFields[`${name}`],
                value
            }
        });
    }

    // render components according to type provided dynamically
    const renderField = (field) => {
        const currentFieldDetails = fieldDetails[`${field.name}`];
        const componentTypeObject = typeof field.component === 'object';
        if (!componentTypeObject && field.component === "TextInput") {
            return <TextInput 
                        key={field.name}
                        field={field}
                        validFields={validFields[`${field.name}`]}
                        errorMessages={currentFieldDetails.errormessage}
                        setValue={handleFormChange}
                    />
        } else if (componentTypeObject && field.component?.name === "CheckboxBase") {
            return <CheckboxBase
                        key={field.name}
                        field={field}
                        validFields={validFields[`${field.name}`]}
                        errorMessages={currentFieldDetails.errormessage}
                        setValue={handleFormChange}
                    />
        } else if (!componentTypeObject && field.component === "PasswordInput") {
            return <PasswordInput
                        key={field.name}
                        field={field}
                        validFields={validFields[`${field.name}`]}
                        errorMessages={currentFieldDetails.errormessage}
                        setValue={handleFormChange}
                    />
        }
    }

    // validate the form and handle submit

    const handleOnSubmit = (e)  => {
        e?.preventDefault();
        let isFormValid = true;
        const validateFields = Object.keys(formFields).reduce((prevObj, key) => {
            const currField = formFields[`${key}`];
            const currentFieldDetails = fieldDetails[currField.name];
            const isRequiredCheck = currentFieldDetails.validations.isRequired && !!currField.value;
            const isFormatCheck = currentFieldDetails.validations.format && emailPattern.test(currField.value);
            const isOneOFCheck = currentFieldDetails.validations.oneOf && (currField.value === currentFieldDetails.validations.oneOf[0]);

            if(isRequiredCheck === false || isFormatCheck === false || isOneOFCheck === false) {
                isFormValid = false;
            }

            return {
                ...prevObj,
                [currField.name]: {
                    isRequiredCheck,
                    ...(isFormatCheck !== undefined && {isFormatCheck: isFormatCheck}),
                    ...(isOneOFCheck !== undefined && {isOneOFCheck: isOneOFCheck}),
                }
            }
        }, {});

        if(isFormValid) {
            setFormValid(true);
        }

        setValidFields(validateFields);
    }
    const resetForm = ()  => {
        initForm();
        setValidFields({});
    }
    
    return (
        <>
            { !formValid 
                ? (<div className={style.signUpForm}>
                        <header>
                            <h3 className='appTitle'>Sign Up</h3>
                        </header>
                        <div className={style.signUpFormFields}>
                            <form onSubmit={(e) => handleOnSubmit(e)}>
                                { Object.keys(formFields).map((key) => renderField(formFields[`${key}`])) }
                                <button id='submitBtn' className={style.formButton} type="submit">{sections[0].submitButtonLabel}</button>
                                <button id='resetBtn' className={style.formButton} type="reset"  onClick={resetForm}>Reset</button>
                            </form>
                        </div>
                    </div>)
                : (<div>
                    <h3> Welcome !!!</h3>
                </div>)}
        </>
    )
}

export default SignUp;
