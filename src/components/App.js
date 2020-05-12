import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './pages/Home';
import Badges from './pages/Badges';
import Menu from './Menu';

const App = props => (
  <>
    <Switch>
      <Route path="/home" render={() => (<Home/>)} />
      <Route path="/badges" render={() => (<Badges/>)} />
    </Switch>
    <Menu />
  </>
);

export default App;
