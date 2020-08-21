import { push } from "connected-react-router";

import client from "../api-client";
import getProfile from "./get-profile";
import setError from "./set-error";
import clearMessage from "./clear-message";
import { LOGIN_FAILURE, LOG_IN_FIRST } from "../constants/messages";

export default function login({ username, password, next }) {
  return async function (dispatch, getState) {
    try {
      const state = getState();

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

      if ([LOG_IN_FIRST, LOGIN_FAILURE].includes(state?.message?.text)) {
        dispatch(clearMessage());
      }
    } catch (error) {
      console.error(error);
      dispatch(
        setError(LOGIN_FAILURE)
      );
    }
  };
}
