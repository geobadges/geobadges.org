import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ columnStart, columnEnd, onChange, onEnter, paddingLeft=130, paddingTop=50, placeholder, row, type="text", value }) => {
  const size = 50;
  const handleChange = e => onChange(e.target.value);
  const handleKeyDown = e => e.code === 'Enter' && onEnter(e.target.value);
  const style = {
    background: 'transparent',
    boxSizing: 'border-box',
    color: '#2B3958',
    fontFamily: 'Kanit',
    fontSize: '18px',
    height: size,
    left: paddingLeft + (columnStart-1) * size,
    paddingLeft: '10px',
    position: 'absolute',
    top: (paddingTop + (row-1) * size) + size / 2,
    transform: 'translateY(-50%)',
    width: (columnEnd - columnStart + 1) * size
  };
  return <input type={type} placeholder={placeholder} style={style} onChange={handleChange} onKeyDown={handleKeyDown} value={value || ''}/>;
};
TextInput.propTypes = {
  columnStart: PropTypes.number.isRequired,
  columnEnd: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  paddingLeft: PropTypes.number,
  paddingTop: PropTypes.number,
  row: PropTypes.number.isRequired,
  type: PropTypes.string,
  value: PropTypes.string
};

export default TextInput;
