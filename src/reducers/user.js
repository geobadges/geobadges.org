export default function user (state=null, action) {
    console.log("starting user reducer with ", {state, action});
    switch(action.type) {
        case 'SET_USER':
            return action.data;
        case 'CLEAR_USER':
            return null;
        default:
            return state;
    }
}
