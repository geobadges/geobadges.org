import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import pick from 'lodash.pick';
import { FaTimes } from 'react-icons/fa';

import clearMessage from '../actions/clear-message';

const MessageBar = ({ message }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(clearMessage());
    };
    if (message) {
        return (
            <div className={`gb-message-bar ${message.type}`}>
                <div className="gb-message-text">{message.text}</div>
                <FaTimes onClick={handleClick}/>
            </div>
        );
    } else {
        return null;
    }

};

MessageBar.propTypes = {
    message: PropTypes.shape({
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    })
};

const mapStateToProps = state => pick(state, ['message']);

export default connect(mapStateToProps)(MessageBar);
