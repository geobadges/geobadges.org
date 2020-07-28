import { push } from "connected-react-router";

// import client from "../api-client";
import setSuccess from "./set-success";

export default function logout({ next } = {}) {
  return async function (dispatch, getState) {
    try {

      // would love to do 
      // await client.revokeToken();
      // but the client doesn't have that set up yet

      dispatch({ type: "LOGOUT" });
      dispatch({ type: "CLEAR_USER" });

      if (next) {
        dispatch(push(next));
      }

      dispatch(
        setSuccess("You successfully logged out.")
      )
    } catch (error) {
      dispatch(
        setError("Failed to Log In. Please check your username and password.")
      );
    }
  };
}
