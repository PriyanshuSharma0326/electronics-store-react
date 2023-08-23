import React from 'react';
import './form-input.styles.scss';

function FormInput({ labelText, inputOptions }) {
    return (
        <div className='form-group'>
            <input 
                className='form-input' 
                {...inputOptions} 
            />

            {labelText && 
            <label 
                htmlFor={inputOptions.id} 
                className={`form-input-label ${inputOptions.value.length ? 'shrink' : ''}`}>
            {labelText}
            </label>}
        </div>
    );
}

export default FormInput;
