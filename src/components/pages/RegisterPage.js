import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import pick from 'lodash.pick';
import { useSearchParam } from 'react-use';
import { Redirect } from 'react-router';

import Pixel from '../Pixel';
import Text from '../Text';
import TextBox from '../TextBox';
import TextInput from '../TextInput';
import StylishButton from '../StylishButton';
import InputBox from '../InputBox';
import Rect from '../Rect';

import register from '../../actions/register';

const RegisterPage = ({ user, router }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  console.log("router:", router);
  const next = useSearchParam('next');

  if (user) {
    return <Redirect to={next ? next : '/account/profile/settings'}/>;
  }

  const handleRegister = () => {
    console.log("starting handleRegister");
    if (email !== "" && password !== "" && confirmPassword !== "" && firstName !== "" && lastName !== "") {
      console.log("registering:", email);
      dispatch(register({ email, password, confirmPassword, firstName, lastName, next }));
    }
  };

  return (
    <section id="register" className="page">
      <div className="react-square-grid" style={{ height: `${13.5 * 50}px`}}>
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
          onEnter={handleRegister}
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
          onEnter={handleRegister}
        />

        <TextBox opacity={1} row={8} columnStart={2} columnEnd={5} text="CONFIRM PASSWORD"/>
        <InputBox
          row={8}
          columnStart={6}
          columnEnd={11}
          opacity={.2}
          placeholder="confirm password here"
          value={confirmPassword}
          onChange={setConfirmPassword}
          onEnter={handleRegister}
        />

        <TextBox opacity={1} row={10} columnStart={3} columnEnd={5} text="FIRST NAME"/>
        <InputBox
          row={10}
          columnStart={6}
          columnEnd={11}
          opacity={.2}
          placeholder="first name here"
          value={firstName}
          onChange={setFirstName}
          onEnter={handleRegister}
        />

        <TextBox opacity={1} row={12} columnStart={3} columnEnd={5} text="LAST NAME"/>
        <InputBox
          row={12}
          columnStart={6}
          columnEnd={11}
          opacity={.2}
          placeholder="last name here"
          value={lastName}
          onChange={setLastName}
          onEnter={handleRegister}
        />

      </div>
      <Link to={`/account/login${next ? `?next=${next}` : ''}`} className="minor-link">Already a User?</Link>
      <br/><br/><br/><br/>
      <StylishButton className="acct-login-button" onClick={handleRegister} text="Register"/>
    </section>
  );
};
RegisterPage.propTypes = {
  router: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = state => pick(state, ['router', 'user']);

export default connect(mapStateToProps)(RegisterPage);
