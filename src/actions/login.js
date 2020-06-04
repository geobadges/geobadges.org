import axios from 'axios';

import getProfile from './get-profile';

export default function login ({ username, password }) {
    console.log("starting login with:", { username, password });
    return async function (dispatch, getState) {
        console.log("starting login async action with", { dispatch, getState });
        console.log("GEOBADGES_API_ENDPOINT:", process.env.GEOBADGES_API_ENDPOINT);

        const url = `${process.env.GEOBADGES_API_ENDPOINT}/o/token`;
        console.log("url:", url);

        const formData = new FormData();
        formData.append("grant_type", "password");
        formData.append("client_id", "public");
        formData.append("scope", "rw:backpack rw:issuer rw:profile");
        formData.append("username", username);
        formData.append("password", password);

        const headers = { 'Content-Type': 'multipart/form-data' };

        const response = await axios({
            url,
            method: 'POST',
            data: formData, 
            headers
        });
        console.log("response:", response);

        const { data } = response;

        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getTime() + data.expires_in * 60 * 1000);

        dispatch({
            type: 'LOGIN',
            data: { accessToken, refreshToken, expirationDate }
        });

        dispatch(getProfile());
    };
};

