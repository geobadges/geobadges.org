import React from 'react';
import PropTypes from 'prop-types';

const LoginBarInput = ({ onChange, onEnter, placeholder, type="text", value }) => {
    console.log("starting LoginBarInput with", value);
    const handleChange = event => onChange(event.target.value);
    const handleKeyPress = event => event.key === "Enter" && onEnter(value);
    return (
        <div className="gb-login-bar-input-wrapper">
            <input
                className="gb-login-bar-input"
                type={type}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                value={value}
            />
        </div>
    );
};

LoginBarInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onEnter: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string
};

export default LoginBarInput;