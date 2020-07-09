import React from 'react';
import PropTypes from 'prop-types';

import Rect from './Rect';
import TextInput from './TextInput';

const InputBox = ({ columnEnd, columnStart, onChange, onEnter, opacity, placeholder, row, value, }) => {
    return (
        <>
            <Rect opacity={opacity} row={row} columnStart={columnStart} columnEnd={columnEnd}/>
            <TextInput
                row={row}
                columnStart={columnStart}
                columnEnd={columnEnd}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onEnter={onEnter}
            />
        </>
    );
};

InputBox.propTypes = {
    columnEnd: PropTypes.number.isRequired,
    columnStart: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onEnter: PropTypes.func.isRequired,
    opacity: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    row: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
};

export default InputBox;

