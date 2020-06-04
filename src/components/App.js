import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import useLoggedIn from '../hooks/useLoggedIn';

import HomePage from './pages/HomePage';
import BadgesPage from './pages/BadgesPage';
import IssuersPage from './pages/IssuersPage';
import LoginBar from './LoginBar';
import Menu from './Menu';

const App = props => {
  const loggedIn = useLoggedIn();
  return (
    <>
      <LoginBar />
      <Switch>
        <Route path="/home" render={() => <HomePage/>} />
        <Route path="/badges" render={() => <BadgesPage/>} />
        <Route path="/issuers" render={() => <IssuersPage/>} />
        {loggedIn ? <Redirect to="/badges" /> : <Redirect to="/home" /> }
      </Switch>
      <Menu />
    </>
  );
};

export default App;
