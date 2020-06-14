import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import pick from 'lodash.pick';
import { FaTimes } from 'react-icons/fa';

import clearError from '../actions/clear-error';

const ErrorBar = ({ error }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(clearError());
    };
    if (error) {
        return (
            <div className="gb-error-bar">
                <div className="gb-error-text">{error}</div>
                <FaTimes onClick={handleClick}/>
            </div>
        );
    } else {
        return null;
    }

};

ErrorBar.propTypes = {
    error: PropTypes.string
};

const mapStateToProps = state => pick(state, ['error']);

export default connect(mapStateToProps)(ErrorBar);
