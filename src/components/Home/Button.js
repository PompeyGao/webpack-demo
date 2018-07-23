import React from 'react';
import '../style.css';

const Button = props => {
    return (
        <button onClick={props.onClick} className="button">
            {props.children}
        </button>
    );
};
export default Button;
