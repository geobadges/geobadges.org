import axios from 'axios';

export default function getBadges() {
    return async function (dispatch, getState) {
        const store = getState();

        if (store.badges !== null) {
            console.log("already loaded badges, no need to load again");
            return;
        }

        const url = `${process.env.GEOBADGES_FUNCTIONS_ENDPOINT}/get-all-badges`;
        console.log("url:", url);

        const response = await axios.get(url);
        console.log("response:", response);

        dispatch({
            type: 'SET_BADGES',
            data: response.data
        });
    };
};