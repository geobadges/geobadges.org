import axios from 'axios';

export default function getIssuers() {
    return async function (dispatch, getState) {
        const store = getState();

        if (store.issuers !== null) {
            console.log("already loaded issuers, no need to load again");
            return;
        }

        const url = `${process.env.GEOBADGES_FUNCTIONS_ENDPOINT}/get-all-issuers`;
        console.log("url:", url);

        const response = await axios.get(url);
        console.log("response:", response);

        dispatch({
            type: 'SET_ISSUERS',
            data: response.data
        });
    };
};
