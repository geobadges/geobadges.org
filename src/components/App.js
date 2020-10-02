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
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
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
        <Route path="/privacy" render={() => <PrivacyPolicyPage/>} />
        <Route path="/terms" render={() => <TermsOfServicePage/>} />
        <Route path="/resources" render={() => <ResourcesPage/>} />

        {/*badgr redirects*/}
        <Route path="/v1/user/forgot-password" render={props => <Redirect to={`/account/settings/password/reset${props.location.search}`}/>} />
        <Route path="/public/issuers/:issuerId" render={props => <Redirect to={`/issuers/${props.match.params.issuerId}/title`}/>} />

        {loggedIn ? <Redirect to="/badges" /> : <Redirect to="/home" /> }
      </Switch>
      <Menu />
    </>
  );
};

export default App;
