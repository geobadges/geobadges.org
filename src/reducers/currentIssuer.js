export default function(state = null, action) {
    switch (action.type) {
      case 'SET_CURRENT_ISSUER':
        return action.data;
      case 'CLEAR_CURRENT_ISSUER':
        return null;
      default:
        return state
    }
}
