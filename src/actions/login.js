import axios from 'axios';
import { push } from 'connected-react-router';

import getProfile from './get-profile';
import setError from './set-error';

export default function login ({ username, password, next }) {
    console.log("starting login with:", { username, password, next });
    return async function (dispatch, getState) {
        try {
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
    
            if (next) {
                dispatch(push(next));
            }
        } catch (error) {
            dispatch(setError('Failed to Log In. Please check your username and password.'));
        }
    };
};

