import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import pick from 'lodash.pick';

import useLoggedIn from '../hooks/useLoggedIn';

import HomePage from './pages/HomePage';
import BadgesPage from './pages/BadgesPage';
import IssuersPage from './pages/IssuersPage';
import LoginBar from './LoginBar';
import Menu from './Menu';

const App = ({ user }) => {
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

const mapStateToProps = (state) => pick(state, 'user');

export default connect(mapStateToProps)(App);
