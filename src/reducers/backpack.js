export default function(state = null, action) {
    switch (action.type) {
      case 'SET_BACKPACK':
        return action.data;      
      default:
        return state
    }
}
