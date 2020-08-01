import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Square = ({ className, color, opacity, top, left, width, height }) => {
  const divClassName = classnames(['react-sq', className]);
  const style = {};
  if (color) style.background = color;
  if (top) {
    if (typeof top === 'number') top += 'px';
    style.top = top;
  }
  if (left) {
    if (typeof left === 'number') left += 'px';
    style.left = left;
  }
  if (opacity) {
    style.opacity = opacity;
  }
  if (width) {
    style.width = width;
  }
  if (height) {
    style.height = height;
  }
  if (left || top) style.position = 'absolute';
  return <div className={divClassName} style={style}/>;
};

Square.propTypes = {
  color: PropTypes.string,
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  opacity: PropTypes.number
};

export default Square;
