import React from 'react';
import './form-input.styles.scss';

function FormInput({ labelText, inputOptions, errorText }) {
    return (
        <div className='form-group'>
            <input 
                className='form-input' 
                {...inputOptions} 
            />

            {labelText && 
            <label 
                htmlFor={inputOptions.id} 
                className={`form-input-label ${inputOptions?.value?.length ? 'shrink' : ''}`}>
            {labelText}
            </label>}

            {errorText && <p className='error-text'>{errorText}</p>}
        </div>
    );
}

export default FormInput;
