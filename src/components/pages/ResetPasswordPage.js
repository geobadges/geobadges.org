import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { push } from "connected-react-router";
import { Link } from 'react-router-dom';
import pick from 'lodash.pick';

import setSuccess from '../../actions/set-success';
import setError from '../../actions/set-error';
import useLocationSearchParams from "../../hooks/useLocationSearchParams";
import client from '../../api-client';
import InputBox from '../InputBox';
import TextBox from '../TextBox';
import StylishButton from '../StylishButton';

const ResetPassword = ({ router, user }) => {
    const dispatch = useDispatch();
    const search = useLocationSearchParams();
    const [token, setToken] = useState(search.token || "");
    const [newPassword, setNewPassword] = useState("");

    const handleRequest = async () => {
        const { data, success } = await client.resetPassword({ newPassword, token });
        if (success) {
            dispatch(setSuccess("You have successfully reset your password"));
            dispatch(push('/account/profile/settings'));
        } else {
            if (data.error) {
                dispatch(setError("You have failed to reset your password because " + data.error[0]));
            } else {
                dispatch(setError("You have failed to reset your password.  Please try again.  It is common for this to fail when the password it too simple. If this fails a second time, feel free to reach out to support@geobadges.io for assistance."));
            }
        }
    };

    return (
        <section id="reset-password" className="page">
            <h1>Reset Password</h1>
            <p>Enter and Submit your Special Password Reset Token and your New Password</p>
            <div className="react-square-grid" style={{ display: 'block', height: '300px', position: 'relative' }}>
                <TextBox
                    opacity={1}
                    row={1}
                    columnStart={1}
                    columnEnd={3}
                    text="RESET TOKEN"
                    paddingLeft={0}
                    paddingTop={50}  
                    textAlign="center"                  
                />
                <InputBox
                    row={1}
                    columnStart={4}
                    columnEnd={10}
                    opacity={.2}
                    placeholder="enter reset token here"
                    value={token}
                    onChange={setToken}
                    paddingLeft={0}
                    paddingTop={0}
                />

                <TextBox
                    opacity={1}
                    row={3}
                    columnStart={1}
                    columnEnd={3}
                    text="NEW PASSWORD"
                    paddingLeft={0}
                    paddingTop={50}  
                    textAlign="center"                  
                />
                <InputBox
                    row={3}
                    columnStart={4}
                    columnEnd={10}
                    opacity={.2}
                    placeholder="enter your new password here"
                    value={newPassword}
                    onChange={setNewPassword}
                    paddingLeft={0}
                    paddingTop={0}
                />

            </div>
            <div><StylishButton text="Submit" onClick={handleRequest}/></div>
        </section>
    );
};

ResetPassword.propTypes = {

};

const mapStateToProps = state => pick(state, ['router', 'user']);

export default connect(mapStateToProps)(ResetPassword);
