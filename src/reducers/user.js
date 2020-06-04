export default function user (state=null, action) {
    console.log("starting user reducer with ", {state, action});
    switch(action.type) {
        case 'SET_USER':
            return action.data;
        default:
            return state;
    }
}
