import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import backpack from './backpack';
import currentBadge from './currentBadge';
import currentIssuer from './currentIssuer';
import badges from './badges';
import message from './message';
import issuers from './issuers';
import user from './user';


const createRootReducer = history => combineReducers({
    auth,
    backpack,
    currentBadge,
    currentIssuer,
    badges,
    issuers,
    message,
    router: connectRouter(history),
    user
});

export default createRootReducer;
