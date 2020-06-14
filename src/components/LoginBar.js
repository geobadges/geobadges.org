import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
import { connect, useDispatch, useSelector } from 'react-redux';
import pick from 'lodash.pick';

import LoginBarInput from './LoginBarInput';
import login from '../actions/login';
import useLoggedIn from '../hooks/useLoggedIn';

const DEFAULT_USERNAME = process.env.GEOBADGES_USER || "";
const DEFAULT_PASSWORD = process.env.GEOBADGES_PASSWORD || "";

const LoginBar = ({ user }) => {
    console.log("rendering LoginBar with user:", user);
    const dispatch = useDispatch();

    const loggedIn = useLoggedIn();
    const [username, setUsername] = useState(DEFAULT_USERNAME);
    const [password, setPassword] = useState(DEFAULT_PASSWORD);

    const handleLogin = () => {
        console.log("starting handleLogin with", {username, password});
        if (username !== "" && password !== "") {
            dispatch(login({ username, password }));
        }
    };

    if (loggedIn) {
        const { firstName, lastName } = user;
        const displayName = [firstName, lastName].filter(Boolean).join(" ");
        const text = `Welcome, ${displayName}!`;
        return (
            <div className="gb-login-bar">
                <FaUserCircle />
                <div className="gb-login-bar-welcome-text-wrapper">
                    <div className="gb-login-bar-welcome-text">{text}</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="gb-login-bar">
                <FaUserCircle />
                <LoginBarInput 
                    placeholder="Username"
                    onChange={setUsername}
                    onEnter={handleLogin}
                    value={username}
                />
                <LoginBarInput
                    placeholder="Password"
                    onChange={setPassword}
                    onEnter={handleLogin}
                    value={password}
                />
            </div>
        );
    }
};

LoginBar.propTypes = { };

const mapStateToProps = (state) => pick(state, ['user']);

export default connect(mapStateToProps)(LoginBar);
