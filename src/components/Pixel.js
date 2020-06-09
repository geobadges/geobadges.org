import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square.js';

const Pixel = ({ column, opacity, row }) => {
  const paddingLeft = 130;
  const paddingTop = 50;
  const size = 50;
  const color ="#F64E21";
  return <Square color={color} opacity={opacity} left={paddingLeft + (column-1) * size} top={paddingTop + (row-1) * size} />
};
Pixel.propTypes = {
  column: PropTypes.number.isRequired,
  opacity: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired
};

export default Pixel;
