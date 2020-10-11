/* global FormData */
import axios from "axios";
import { push } from "connected-react-router";

import fileToB64 from "../utils/file-to-b64";
import client from "../api-client";
import setError from "./set-error";
import setSuccess from "./set-success";
import getBackpack from "./get-backpack";


export default function submitEvidence({
  badgeEntityId,
  badgeName,
  files,
  issuerName,
  text
}) {
  console.log("starting submitEvidence with", {
    badgeEntityId
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
            `Couldn't find an access token while submiting your evidence. If this happens again, please contact support at support@geobadges.io`
          )
        );
      }

      const url = `${process.env.GEOBADGES_FUNCTIONS_ENDPOINT}/submit-evidence`;
      console.log("url:", url);

      const formData = new FormData();
      formData.append('accessToken', accessToken);
      formData.append('badgeEntityId', badgeEntityId);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileb64 = await fileToB64(file);
        formData.append(`evidence-${file.name}`, fileb64);
      }
      if (text) formData.append('evidence-text', text);

      const options = { headers: { 'Content-Type': 'multipart/form-data' } };
      const response = await axios.post(url, formData, options);
      console.log("response:", response);

      const status = response.data.status;

      if (status === "success") {
        dispatch(
          setSuccess(
            `Your evidence has been sent to the ${issuerName} for verification.  You should receive a response with 48 hours.`
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
