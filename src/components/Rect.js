import React from 'react';
import PropTypes from 'prop-types';

import Pixel from './Pixel';

const Rect = ({ row, opacity, columnStart, columnEnd, paddingLeft }) => {
    const pixels = [];
    for (let i = columnStart; i <= columnEnd; i++) {
        pixels.push(<Pixel opacity={opacity} row={row} column={i} key={row+'-'+i} paddingLeft={paddingLeft}/>);
    }
    return <>{pixels}</>;
}

Rect.propTypes = {
    row: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired,
    columnStart: PropTypes.number.isRequired,
    columnEnd: PropTypes.number.isRequired
};

export default Rect;
