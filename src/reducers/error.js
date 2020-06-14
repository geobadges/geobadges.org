export default function(state = null, action) {
    switch (action.type) {
      case 'CLEAR_ERROR':
        return null;
      case 'SET_ERROR':
        return action.data;      
      default:
        return state
    }
}
