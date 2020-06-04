export default function(state = null, action) {
    switch (action.type) {
      case 'SET_BADGES':
        return action.data;      
      default:
        return state
    }
}
