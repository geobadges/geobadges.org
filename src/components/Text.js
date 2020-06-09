import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ children, columnStart, columnEnd, row }) => {
  const paddingLeft = 130;
  const paddingTop = 50;
  const size = 50;
  const style = {
    color: '#D7CDCC',
    fontFamily: 'Kanit',
    fontSize: '18px',
    // height: size,
    left: paddingLeft + (columnStart-1) * size,
    position: 'absolute',
    top: (paddingTop + (row-1) * size) + size / 2,
    transform: 'translateY(-50%)',
    width: (columnEnd - columnStart + 1) * size
  };
  return <div style={style}>{children}</div>;
};
Text.propTypes = {
  children: PropTypes.node.isRequired,
  columnStart: PropTypes.number.isRequired,
  columnEnd: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired
};

export default Text;
