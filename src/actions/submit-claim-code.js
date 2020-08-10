import axios from "axios";
import { push } from "connected-react-router";

import client from "../api-client";
import setError from "./set-error";
import setSuccess from "./set-success";
import getBackpack from "./get-backpack";

export default function submitClaimCode({ badgeName, claimCode, issuerName }) {
  console.log("starting submitClaimCode with", {
    badgeName,
    claimCode,
    issuerName,
  });
  return async function (dispatch, getState) {
    try {
      const store = getState();

      const accessToken =
        client?.accessToken || store?.auth.accessToken || null;

      console.log("accessToken:", accessToken);

      if (!accessToken) {
        dispatch(
          setError(
            `Couldn't find an access token while submiting your claim code. If this happens again, please contact support at support@geobadges.io`
          )
        );
      }

      const url = `${process.env.GEOBADGES_FUNCTIONS_ENDPOINT}/submit-claim-code`;
      console.log("url:", url);

      const data = {
        accessToken,
        badgeName,
        claimCode,
        issuerName,
      };
      console.log("data:", data);

      const response = await axios.post(url, data);
      console.log("response:", response);

      const status = response.data.status;

      if (status === "successful") {
        dispatch(
          setSuccess(
            `Your claim was succesfully processed and you have earned the ${badgeName} Badge`
          )
        );
        const pathname = store?.router?.location?.pathname;

        // go/return to Badges page after you claim a badge
        if (
          pathname?.startsWith("/badges/") &&
          pathname?.length > "/badges/".length
        ) {
          dispatch(push("/badges"));
        }
        dispatch(getBackpack());
      } else {
        console.log("status:", status);
        dispatch(
          setError(
            `There was an error submiting your claim code. Please contact support at support@geobadges.io`
          )
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        setError(
          "Failed to Submit Claim Code. Please Try Again.  If this is a common problem, please contact support@geobadges.io"
        )
      );
    }
  };
}
