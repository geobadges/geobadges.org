import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import pick from 'lodash.pick';
import { FaTimes } from 'react-icons/fa';

import clearSuccess from '../actions/clear-success';

const SuccessBar = ({ success }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(clearSuccess());
    };
    if (success) {
        return (
            <div className="gb-success-bar">
                <div className="gb-success-text">{success}</div>
                <FaTimes onClick={handleClick}/>
            </div>
        );
    } else {
        return null;
    }

};

SuccessBar.propTypes = {
    success: PropTypes.string
};

const mapStateToProps = state => pick(state, ['success']);

export default connect(mapStateToProps)(SuccessBar);
