import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import pick from 'lodash.pick';

import useLoggedIn from '../hooks/useLoggedIn';

import AccountPage from './pages/AccountPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
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
        <Route path="/account/settings/email/confirm" render={() => <ConfirmEmailPage/>} />
        <Route path="/account/settings/password/forgot" render={() => <ForgotPasswordPage/> } />
        <Route path="/account/settings/password/reset" render={() => <ResetPasswordPage/> } />
        <Route path="/issuers/:issuerId?/:issuerCard?" render={() => <IssuersPage/>} />
        <Route path="/account" render={() => <AccountPage/>} />
        <Route path="/privacy" render={() => <PrivacyPolicyPage/>} />
        <Route path="/terms" render={() => <TermsOfServicePage/>} />
        <Route path="/resources" render={() => <ResourcesPage/>} />

        {/*badgr redirects*/}
        <Route path="/v1/user/forgot-password" render={props => <Redirect to={`/account/settings/password/reset${props.location.search}`}/>} />
        <Route path="/public/issuers/:issuerId" render={props => <Redirect to={`/issuers/${props.match.params.issuerId}/title`}/>} />
        <Route path="/v1/user/confirmemail" render={props => <Redirect to={`/account/settings/email/confirm${props.location.search}&confirmId=${btoa(props.location.pathname.split('/').slice(-1)[0])}`}/>} />

        {loggedIn ? <Redirect to="/badges" /> : <Redirect to="/home" /> }
      </Switch>
      <Menu />
    </>
  );
};

export default App;
