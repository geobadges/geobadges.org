import axios from "axios";
import { push } from "connected-react-router";

import setError from "./set-error";
import clearMessage from './clear-message';
import login from "./login";
import client from "../api-client";

export default function register({
  email,
  firstName,
  lastName,
  password,
  next,
}) {
  console.log("starting register with:", {
    email,
    firstName,
    lastName,
    password,
    next,
  });
  return async function (dispatch, getState) {
    try {
      const data = {
        agreedToTermsOfService: true,
        email,
        firstName,
        lastName,
        optedInToMarketing: false,
        password
      }
      const successful = await client.register(data);

      if (successful) {
        dispatch(login({ username: email, password, next }));

        // makes sure any left-over messages are cleared
        dispatch(clearMessage());  
      }

    } catch (error) {
      let message = "Failed to Register. ";
      try {
        console.log("error:", error);
        console.log("error.response:", error.response);
        const { data } = error.response;
        if (data) {
          if (typeof data === "string") {
            message += data;
          } else if (typeof data === "object") {
            if (Array.isArray(data.password)) {
              message += data.password.join(" ");
            }
          }
        }
      } catch (error) {
        message += "Please check your username and password.";
      }
      dispatch(setError(message));
    }
  };
}
