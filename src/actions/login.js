import { push } from "connected-react-router";

import client from "../api-client";
import getProfile from "./get-profile";
import setError from "./set-error";

export default function login({ username, password, next }) {
  return async function (dispatch, getState) {
    try {
      const {
        accessToken,
        refreshToken,
        expirationDate,
      } = await client.getAccessToken({ username, password });

      dispatch({
        type: "LOGIN",
        data: { accessToken, refreshToken, expirationDate },
      });

      dispatch(getProfile());

      if (next) {
        dispatch(push(next));
      }
    } catch (error) {
      dispatch(
        setError("Failed to Log In. Please check your username and password.")
      );
    }
  };
}
