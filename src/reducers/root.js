import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import badges from './badges';
import issuers from './issuers'; 
import user from './user';


const createRootReducer = history => combineReducers({
    auth,
    badges,
    issuers,
    router: connectRouter(history),
    user
}); 

export default createRootReducer;
