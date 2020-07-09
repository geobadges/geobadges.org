import axios from "axios";
import { push } from "connected-react-router";

import setError from "./set-error";
import login from "./login";

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
      const url = `${process.env.GEOBADGES_API_ENDPOINT}/v1/user/profile`;
      console.log("url:", url);

      const response = await axios({
        url,
        method: "POST",
        data: {
          agreed_terms_service: true,
          email,
          first_name: firstName,
          last_name: lastName,
          marketing_opt_in: false,
          password,
        },
      });
      console.log("response:", response);

      const { data } = response;

      dispatch(login({ username: email, password, next }));

      // console.log("data:", data);

      // dispatch({
      //     type: 'LOGIN',
      //     data: { accessToken, refreshToken, expirationDate }
      // });

      // dispatch(getProfile());

      // if (next) {
      //     dispatch(push(next));
      // }
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
