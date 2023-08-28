import React from 'react';
import './button.styles.scss';

const BUTTON_TYPE_CLASS = {
    google: 'google-sign-in',
    inverted: 'inverted',
    simple: 'simple'
}

function Button({ buttonText, type, buttonType, ...otherProps }) {
    return (
        <button 
            className={`button-container ${BUTTON_TYPE_CLASS[buttonType]}`} 
            type={type} 
            {...otherProps} 
        >
            {buttonText}
        </button>
    )
}

export default Button;
