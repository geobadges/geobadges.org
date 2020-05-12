import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import badges from './badges';


const createRootReducer = history => combineReducers({
    badges,
    router: connectRouter(history)
}); 

export default createRootReducer;
