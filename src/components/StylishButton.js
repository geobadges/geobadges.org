import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import pick from 'lodash.pick';

const StylishButton = ({ onClick, text }) => {
  return <button className="stylish-button" onClick={onClick}>{text}</button>
};
StylishButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default StylishButton;
