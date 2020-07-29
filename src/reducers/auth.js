export default function auth (state=null, action) {
    console.log("starting auth reducer with ", {state, action});
    switch(action.type) {
        case 'LOGIN':
            return action.data;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
}
