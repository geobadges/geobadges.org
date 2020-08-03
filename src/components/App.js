import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import pick from 'lodash.pick';

import useLoggedIn from '../hooks/useLoggedIn';

import AccountPage from './pages/AccountPage';
import MessageBar from './MessageBar';
import HomePage from './pages/HomePage';
import BadgesPage from './pages/BadgesPage';
import IssuersPage from './pages/IssuersPage';
import ResourcesPage from './pages/ResourcesPage';
import LoginBar from './LoginBar';
import Menu from './Menu';

const App = () => {
  const loggedIn = useLoggedIn();
  return (
    <>
      <LoginBar />
      <MessageBar />
      <Switch>
        <Route path="/home" render={() => <HomePage/>} />
        <Route path="/badges" render={() => <BadgesPage/>} />
        <Route path="/issuers/:issuerId?/:issuerCard?" render={() => <IssuersPage/>} />
        <Route path="/account" render={() => <AccountPage/>} />
        <Route path="/resources" render={() => <ResourcesPage/>} />
        {loggedIn ? <Redirect to="/badges" /> : <Redirect to="/home" /> }
      </Switch>
      <Menu />
    </>
  );
};

export default App;
