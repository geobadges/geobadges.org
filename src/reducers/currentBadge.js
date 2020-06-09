export default function(state = null, action) {
    switch (action.type) {
      case 'SET_CURRENT_BADGE':
        console.log("in reducer currentBadge.js and action type is SET_CURRENT_BADGE");
        return action.data;
      case 'CLEAR_CURRENT_BADGE':
        return null;
      default:
        return state
    }
}
