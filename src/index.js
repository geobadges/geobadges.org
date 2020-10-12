import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import StateBridge from 'state-bridge'

import App from './components/App'
import store from './store'
import history from './browser-history'
import syncers from './syncers'
import syncStore from './sync-store'
import './styles/_main.scss'

syncStore(store, syncers);

const appElement = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <StateBridge store={store} element={appElement} keys={['menu']}>
        <App />
      </StateBridge>
    </ConnectedRouter>
  </Provider>,
  appElement
);
