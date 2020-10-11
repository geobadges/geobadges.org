export default function(state = false, action) {
    switch (action.type) {
      case 'HIDE_MENU':
        return false;
      case 'SHOW_MENU':
        return true;      
      default:
        return state
    }
}
