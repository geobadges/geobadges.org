import { push } from 'connected-react-router';
import client from "../api-client";

import setError from './set-error'
import setSuccess from './set-success';


export default function confirmEmail({
    appId=1,
    confirmId,
    debug=true,
    next='/account/profile/settings',
    token
}) {
    if (debug) console.log("starting confirm-email action with", { appId, confirmId, next, token });
    return async function (dispatch) {
        if (!confirmId) {
            dispatch(setError('Email confirmation failed because there was no confirmation ID.  Please contact technical support at support@geobadges.io'));
        }
        if (!token) {
            dispatch(setError('Email confirmation failed because there was no token.  Please contact technical support at support@geobadges.io'));
        }

        const { data, success } = await client.confirmEmail({
            appId,
            confirmId,
            debug,
            token
        });
        console.log({data, success});
        if (success) {
            let message = "You have successfully confirmed your email address";
            if (data.email) message += ": " + data.email;
            dispatch(setSuccess(message));
            if (next) dispatch(push(next));
        } else {
            if (data.error) {
                dispatch(setError("You have failed to confirm your email because " + data.error));
            } else {
                dispatch(setError("You have failed to confirm your email.  Please try again.  If this fails a second time, feel free to reach out to support@geobadges.io for assistance."));
            }
        }        
    };
};
