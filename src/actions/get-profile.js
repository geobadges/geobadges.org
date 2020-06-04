import axios from 'axios';

export default function getProfile(entityId = "self") {
    console.log("getProfile:", getProfile);

    return async function (dispatch, getState) {
        const state = getState();
        const { accessToken } = state.auth;

        const url = `${process.env.GEOBADGES_API_ENDPOINT}/v2/users/${entityId}`;
        console.log("url:", url);

        const response = await axios({
            params: { access_token: accessToken },
            method: 'GET',
            url
        });
        console.log("response:", response);

        const { emails, firstName, lastName } = response.data.result[0];

        dispatch({
            type: 'SET_USER',
            data: { emails, firstName, lastName }
        });
    };
};
