import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import pick from 'lodash.pick';
import { useSearchParam } from 'react-use';
import { Redirect } from 'react-router';

import Pixel from '../Pixel';
import Rect from '../Rect';
import Text from '../Text';
import TextBox from '../TextBox';
import TextInput from '../TextInput';
import StylishButton from '../StylishButton';
import InputBox from '../InputBox';

import login from '../../actions/login';

const DEFAULT_USERNAME = process.env.GEOBADGES_USER || "";
const DEFAULT_PASSWORD = process.env.GEOBADGES_PASSWORD || "";

const LoginPage = ({ user, router }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(DEFAULT_USERNAME);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);

  console.log("router:", router);
  const next = useSearchParam('next');

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      dispatch(login({ username: email, password, next }));
    }
  };

  if (user) {
    return <Redirect to={next ? next : '/account/profile/settings'}/>;
  }

  return (
    <section id="login" className="page">
      <div className="react-square-grid" style={{ height: `${7.5 * 50}px`}}>
        <Pixel opacity={1} row={1} column={4}/>

        <Pixel opacity={.5} row={2} column={2}/>
        <Pixel opacity={.3} row={2} column={4}/>

        <Pixel opacity={.85} row={3} column={1}/>
        <Pixel opacity={.64} row={3} column={3}/>

        <Pixel opacity={1} row={4} column={2}/>

        <TextBox opacity={1} row={4} columnStart={4} columnEnd={5} text="EMAIL"/>
        <InputBox
          row={4}
          columnStart={6}
          columnEnd={11}
          opacity={.2}
          placeholder="enter email here"
          value={email}
          onChange={setEmail}
          onEnter={handleLogin}
        />

        <Pixel opacity={.65} row={5} column={1}/>
        <Pixel opacity={.47} row={5} column={2}/>

        <TextBox opacity={1} row={6} columnStart={3} columnEnd={5} text="PASSWORD"/>
        <InputBox
          row={6}
          columnStart={6}
          columnEnd={11}
          opacity={.2}
          placeholder="enter password here"
          value={password}
          onChange={setPassword}
          onEnter={handleLogin}
        />

      </div>
      <Link to={`/account/new${next ? `?next=${next}` : ''}`} className="minor-link">new user</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={`/account/settings/password/forgot${next ? `?next=${next}` : ''}`} className="minor-link">forgot password?</Link>
      <br/><br/><br/><br/>
      <StylishButton className="acct-login-button" onClick={handleLogin} text="Login"/>
    </section>
  );
};
LoginPage.propTypes = {
  router: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = state => pick(state, ['router', 'user']);

export default connect(mapStateToProps)(LoginPage);
