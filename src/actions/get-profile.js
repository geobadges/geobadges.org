import client from "../api-client";

export default function getProfile(entityId = "self") {

    return async function (dispatch, getState) {
        const state = getState();
        const { accessToken } = state.auth;
        const fields = ['emails', 'firstName', 'lastName' ];
        const profile = await client.getUser({ accessToken, entityId, fields });

        dispatch({
            type: 'SET_USER',
            data: profile
        });
    };
};
