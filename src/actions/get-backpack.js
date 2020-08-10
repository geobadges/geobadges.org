import axios from "axios";

export default function getBackpack() {
  return async function (dispatch, getState) {
    const store = getState();

    if (store.auth === null) {
      console.log("haven't logged in yet, so not going to get the backpack");
      return;
    }

    if (store.backpack !== null) {
      console.log("already loaded backpack, no need to load again");
      return;
    }

    const fields = ["entityId", "image", "badgeclass", "badgeclassName"];
    const url = `${process.env.GEOBADGES_FUNCTIONS_ENDPOINT}/get-backpack`;

    const { accessToken } = store.auth;
    const params = { accessToken, fields: fields.join(",") };
    const response = await axios.get(url, { params });

    const { data: backpack } = response;

    dispatch({
      type: "SET_BACKPACK",
      data: backpack,
    });
  };
}
