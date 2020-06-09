import axios from 'axios';

export default function setCurrentBadge(badge) {
    console.log("starting setCurrentBadge with badge:", badge);
    return async function (dispatch, getState) {
        const store = getState();

        if (typeof badge === 'string') {
            console.log("inside setCurrentBadge with badge:", badge);
            const found = store.badges && store.badges.find(({ entityId }) => entityId === badge);
            if (found) {
                badge = found;
            } else {
                const url = `${process.env.GEOBADGES_FUNCTIONS_ENDPOINT}/get-badge?entityId=${badge}`;
                console.log("url:", url);

                const response = await axios.get(url);
                badge = response.data
            }
        }

        if (store.currentBadge !== badge) {
            dispatch({
                type: 'SET_CURRENT_BADGE',
                data: badge
            });
        }
    };
};
