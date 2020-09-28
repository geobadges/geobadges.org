import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import pick from 'lodash.pick';

import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import RegisterPage from './RegisterPage';

import Footer from '../Footer';

import useLoggedIn from '../../hooks/useLoggedIn';

const AccountPage = ({ user, router }) => {
  const loggedIn = useLoggedIn();
  return (
    <>
      <Switch>
        <Route path="/account/login" render={() => <LoginPage/>} />
        <Route path="/account/new" render={() => <RegisterPage/>} />
        <Route path="/account/profile" render={() => <ProfilePage/>} />
        {loggedIn ? <Redirect to="/account/profile" /> : <Redirect to="/account/login?next=/account/profile" /> }
      </Switch>
      <Footer/>
    </>
  );
};
AccountPage.propTypes = {
  router: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = state => pick(state, ['router', 'user']);

export default connect(mapStateToProps)(AccountPage);
