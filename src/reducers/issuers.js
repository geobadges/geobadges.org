export default function issuers (state=null, action) {
    switch(action.type) {
        case 'SET_ISSUERS':
            return action.data;
        default:
            return state;
    }
}
