import axios from "axios";
import { push } from "connected-react-router";

import setError from "./set-error";

export default function setCurrentBadge(badge) {
  console.log("starting setCurrentBadge with badge:", badge);
  return async function (dispatch, getState) {
    const store = getState();

    if (typeof badge === "string") {
      console.log("inside setCurrentBadge with badge:", badge);
      const found =
        store.badges && store.badges.find(({ entityId }) => entityId === badge);
      if (found) {
        badge = found;
      } else {
        try {
          const url = `${process.env.GEOBADGES_FUNCTIONS_ENDPOINT}/get-badge?entityId=${badge}`;
          console.log("url:", url);

          const response = await axios.get(url);
          badge = response.data;
        } catch (error) {
          dispatch(
            setError(`It doesn't look like a badge exists with the id ${badge}`)
          );
          if (
            store?.router?.location?.pathname.startsWith(`/badges/${badge}`)
          ) {
            dispatch(push("/badges"));
          }
        }
      }
    }

    if (store.currentBadge !== badge) {
      dispatch({
        type: "SET_CURRENT_BADGE",
        data: badge,
      });
    }
  };
}
