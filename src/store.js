import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import history from './browser-history'
import createRootReducer from './reducers/root'
import hydrate from './hydrate'

const initialState = hydrate();

const composeTool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  createRootReducer(history),
  initialState,
  composeTool(applyMiddleware(routerMiddleware(history), thunk))
);

export default store;

