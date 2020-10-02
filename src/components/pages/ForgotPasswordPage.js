import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import setSuccess from '../../actions/set-success';
import client from '../../api-client';
import InputBox from '../InputBox';
import StylishButton from '../StylishButton';

const DEFAULT_EMAIL = process.env.GEOBADGES_EMAIL || "";

const ForgotPasswordPage = ({ router, user }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState(DEFAULT_EMAIL);

    const handleRequest = async () => {
        const success = await client.requestPasswordReset({ email });
        dispatch(setSuccess("An email has been sent to " + email));
    };

    return (
        <section id="forgot-password" className="page">
            <h1>Forgot Password</h1>
            <p>Enter and Submit your Email and We will Send you a Password-Reset Email</p>
            <div className="react-square-grid" style={{ display: 'block', height: '150px', position: 'relative' }}>
                <InputBox
                    row={1}
                    columnStart={1}
                    columnEnd={10}
                    opacity={.2}
                    placeholder="enter email here"
                    value={email}
                    onChange={setEmail}
                    onEnter={handleRequest}
                    paddingLeft={0}
                    paddingTop={0}
                />
            </div>
            <div><StylishButton text="Submit" onClick={handleRequest}/></div>
        </section>
    );
};

export default ForgotPasswordPage;
