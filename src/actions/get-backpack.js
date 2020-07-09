import client from '../api-client';

export default function getBackpack() {
    return async function (dispatch, getState) {
        const store = getState();

        if (store.user === null) {
            console.log("haven't logged in yet, so not going to get the backpack");
            return;
        }

        if (store.backpack !== null) {
            console.log("already loaded backpack, no need to load again");
            return;
        }
        const fields = ['entityId', 'image']
        /// hit up functions url /get-backpack?accessToken=${accessToken}&fields=badgeclass,badgeclassName,image

        dispatch({
            type: 'SET_BACKPACK',
            data: backpack
        });
    };
};
