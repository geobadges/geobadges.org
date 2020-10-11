import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import LoginBarInput from './LoginBarInput';
import login from '../actions/login';
import useLoggedIn from '../hooks/useLoggedIn';
import MenuControl from './MenuControl';

const DEFAULT_USERNAME = process.env.GEOBADGES_USER || "";
const DEFAULT_PASSWORD = process.env.GEOBADGES_PASSWORD || "";

const LoginBar = ({ }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    console.log("user:", user);

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
            <div className="login-bar-background">
                <div className="gb-login-bar">
                    <Link to="/account/profile"><FaUserCircle/></Link>
                    <div className="gb-login-bar-welcome-text-wrapper">
                        <div className="gb-login-bar-welcome-text">{text}</div>
                    </div>
                    <MenuControl />
                </div>
            </div>
        );
    } else {
        return (
            <div className="login-bar-background">
                <div className="gb-login-bar">
                    <Link to="/account/login?next=/account/profile/badges"><FaUserCircle /></Link>
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
                        type="password"
                        value={password}
                    />
                    <MenuControl/>
                </div>
            </div>
        );
    }
};

LoginBar.propTypes = {

};

export default LoginBar;
