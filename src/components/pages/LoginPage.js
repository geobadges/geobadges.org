import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import pick from 'lodash.pick';

import Pixel from '../Pixel';
import Text from '../Text';
import TextInput from '../TextInput';
import StylishButton from '../StylishButton';

import login from '../../actions/login';

const DEFAULT_USERNAME = process.env.GEOBADGES_USER || "";
const DEFAULT_PASSWORD = process.env.GEOBADGES_PASSWORD || "";

const LoginPage = ({ user, router }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(DEFAULT_USERNAME);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      dispatch(login({ username: email, password }));
    }
  };

  return (
    <section id="login" className="page">
      <div className="react-square-grid">
        <Pixel opacity={1} row={1} column={4}/>

        <Pixel opacity={.5} row={2} column={2}/>
        <Pixel opacity={.3} row={2} column={4}/>

        <Pixel opacity={.85} row={3} column={1}/>
        <Pixel opacity={.64} row={3} column={3}/>

        <Pixel opacity={1} row={4} column={2}/>
        <Pixel opacity={1} row={4} column={4}/>
        <Pixel opacity={1} row={4} column={5}/>
        <Pixel opacity={.2} row={4} column={6}/>
        <Pixel opacity={.2} row={4} column={7}/>
        <Pixel opacity={.2} row={4} column={8}/>
        <Pixel opacity={.2} row={4} column={9}/>
        <Pixel opacity={.2} row={4} column={10}/>
        <Pixel opacity={.2} row={4} column={11}/>
        <Text row={4} columnStart={4} columnEnd={5}>EMAIL</Text>
        <TextInput
          row={4}
          columnStart={6}
          columnEnd={11}
          placeholder="enter email here"
          value={password}
          onChange={setPassword}
          onEnter={handleLogin}
        />

        <Pixel opacity={.65} row={5} column={1}/>
        <Pixel opacity={.47} row={5} column={2}/>

        <Pixel opacity={1} row={6} column={3}/>
        <Pixel opacity={1} row={6} column={4}/>
        <Pixel opacity={1} row={6} column={5}/>
        <Pixel opacity={.2} row={6} column={6}/>
        <Pixel opacity={.2} row={6} column={7}/>
        <Pixel opacity={.2} row={6} column={8}/>
        <Pixel opacity={.2} row={6} column={9}/>
        <Pixel opacity={.2} row={6} column={10}/>
        <Pixel opacity={.2} row={6} column={11}/>
        <Text row={6} columnStart={3} columnEnd={5}>PASSWORD</Text>
        <TextInput
          row={6}
          columnStart={6}
          columnEnd={11}
          placeholder="enter password here"
          value={email}
          onChange={setEmail}
          onEnter={handleLogin}
        />

      </div>
      <Link to='/account/new' className="minor-link">new user</Link>
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
