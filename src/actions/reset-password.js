import { push } from 'connected-react-router';
import client from "../api-client";

import setError from './set-error'
import setSuccess from './set-success';


// UNUSED WORK IN PROGRESS
export default function resetPassword({ token, newPassword }) {

    return async function (dispatch, getState) {
        const state = getState();
        const { accessToken } = state.auth;
        const { data, success } = await client.resetPassword({ accessToken, newPassword, token });
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
};
