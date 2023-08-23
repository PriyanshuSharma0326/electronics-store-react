import React from 'react';
import './button.styles.scss';

function Button({ buttonText, buttonType }) {
    return (
        <button className="button-container" type={buttonType}>
            {buttonText}
        </button>
    )
}

export default Button;
