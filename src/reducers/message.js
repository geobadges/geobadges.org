export default function(state = null, action) {
    switch (action.type) {
      case 'CLEAR_MESSAGE':
        return null;
      case 'SET_MESSAGE':
        return action.data;      
      default:
        return state
    }
}
