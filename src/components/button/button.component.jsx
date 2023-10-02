import React from 'react';
import './button.styles.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BUTTON_TYPE_CLASS = {
    blue: 'blue',
    inverted: 'inverted',
    simple: 'simple',
    icon: 'icon'
}

function Button({ buttonText, type, buttonType, ...otherProps }) {
    return (
        <button 
            className={`button-container ${BUTTON_TYPE_CLASS[buttonType]}`} 
            type={type} 
            {...otherProps} 
        >
            {buttonType !== 'icon' && buttonText}

            {buttonType === 'icon' && <FontAwesomeIcon icon={otherProps.icon} />}
        </button>
    )
}

export default Button;
