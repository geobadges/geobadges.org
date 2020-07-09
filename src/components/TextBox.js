import React from 'react';
import PropTypes from 'prop-types';

import Rect from './Rect';
import Text from './Text';

const TextBox = ({ opacity, row, columnStart, columnEnd, text }) => {
    return (
        <>
            <Rect opacity={opacity} row={row} columnStart={columnStart} columnEnd={columnEnd}/>
            <Text row={row} columnStart={columnStart} columnEnd={columnEnd}>{text}</Text>
        </>
    );
};

TextBox.propTypes = {
    opacity: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    columnStart: PropTypes.number.isRequired,
    columnEnd: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
};

export default TextBox;
