import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square.js';

const Pixel = ({ color="#F64E21", column, height=50, opacity, paddingLeft=130, paddingTop=50, row, size=50, width=50 }) => {
  return <Square color={color} opacity={opacity} left={paddingLeft + (column-1) * size} top={paddingTop + (row-1) * size} height={height} width={width} />
};
Pixel.propTypes = {
  column: PropTypes.number.isRequired,
  opacity: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired
};

export default Pixel;
