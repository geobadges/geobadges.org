import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import currentBadge from './currentBadge';
import currentIssuer from './currentIssuer';
import badges from './badges';
import issuers from './issuers';
import user from './user';


const createRootReducer = history => combineReducers({
    auth,
    currentBadge,
    currentIssuer,
    badges,
    issuers,
    router: connectRouter(history),
    user
});

export default createRootReducer;
