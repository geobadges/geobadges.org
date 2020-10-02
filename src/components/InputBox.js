import React from 'react';
import PropTypes from 'prop-types';

import Rect from './Rect';
import TextInput from './TextInput';

const InputBox = ({ columnEnd, columnStart, onChange, onEnter, opacity, paddingLeft, placeholder, row, type, value, }) => {
    return (
        <>
            <Rect opacity={opacity} row={row} columnStart={columnStart} columnEnd={columnEnd} paddingLeft={paddingLeft}/>
            <TextInput
                row={row}
                columnStart={columnStart}
                columnEnd={columnEnd}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                onEnter={onEnter}
                paddingLeft={paddingLeft}
            />
        </>
    );
};

InputBox.propTypes = {
    columnEnd: PropTypes.number.isRequired,
    columnStart: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onEnter: PropTypes.func,
    opacity: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string,
    row: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
};

export default InputBox;

