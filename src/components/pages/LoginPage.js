import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import pick from 'lodash.pick';
import { useSearchParam, useUpdate } from 'react-use';
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

const MOBILE_BREAK = 1050;

const LoginPage = ({ user, router }) => {
  const dispatch = useDispatch();
  const update = useUpdate();

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

  let height, width, size = 50;
  let paddingLeft = 130;
  const windowInnerWidth = window.innerWidth;
  if (windowInnerWidth < MOBILE_BREAK) {
    paddingLeft = 0;
  }
  console.log({paddingLeft});

  window.addEventListener("resize", update);

  const common = { paddingLeft, height, width, size };

  if (windowInnerWidth >= MOBILE_BREAK) {
    return (
      <section id="login" className="page">
        <div className="react-square-grid" style={{ height: `${7.5 * 50}px`}}>
          <Pixel opacity={1} row={1} column={4} {...common}/>
  
          <Pixel opacity={.5} row={2} column={2} {...common}/>
          <Pixel opacity={.3} row={2} column={4} {...common}/>
  
          <Pixel opacity={.85} row={3} column={1} {...common}/>
          <Pixel opacity={.64} row={3} column={3} {...common}/>
  
          <Pixel opacity={1} row={4} column={2} {...common}/>
  
          <TextBox opacity={1} row={4} columnStart={4} columnEnd={5} text="EMAIL" {...common}/>
          <InputBox
            row={4}
            columnStart={6}
            columnEnd={11}
            opacity={.2}
            placeholder="enter email here"
            value={email}
            onChange={setEmail}
            onEnter={handleLogin}
            {...common}
          />
  
          <Pixel opacity={.65} row={5} column={1} {...common}/>
          <Pixel opacity={.47} row={5} column={2} {...common}/>
  
          <TextBox opacity={1} row={6} columnStart={3} columnEnd={5} text="PASSWORD" {...common}/>
          <InputBox
            row={6}
            columnStart={6}
            columnEnd={11}
            opacity={.2}
            placeholder="enter password here"
            value={password}
            onChange={setPassword}
            onEnter={handleLogin}
            {...common}
          />
  
        </div>
        <Link to={`/account/new${next ? `?next=${next}` : ''}`} className="minor-link">new user</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={`/account/settings/password/forgot${next ? `?next=${next}` : ''}`} className="minor-link">forgot password?</Link>
        <br/><br/><br/><br/>
        <StylishButton className="acct-login-button" onClick={handleLogin} text="Login"/>
      </section>
    );
  } else if (windowInnerWidth < MOBILE_BREAK) {
    return (
      <section id="login" className="page">

        <div style={{ background: "rgb(246, 78, 33)", height: "50px", opacity: 1, width: "100%" }} />
        <div style={{ color: "rgb(215, 205, 204)", fontFamily: "Kanit", fontSize: "18px", left: 0, lineHeight: "50px", textAlign: "center", position: "absolute", width: "100%", right: 0, transform: "translateY(-100%)"}}>EMAIL</div>

        <div style={{ background: "#eccbc4", width: "100%", height: "50px" }} />
        <input
          type="text"
          placeholder="enter email here"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ background: "transparent", boxSizing: "border-box", color: "rgb(43, 57, 88)", fontFamily: "Kanit", fontSize: "18px", height: "50px", left: 0, paddingLeft: "10px", transform: "translateY(-100%)", width: "100%"}}
        />   


        <div style={{ background: "rgb(246, 78, 33)", height: "50px", opacity: 1, width: "100%" }} />
        <div style={{ color: "rgb(215, 205, 204)", fontFamily: "Kanit", fontSize: "18px", left: 0, lineHeight: "50px", textAlign: "center", position: "absolute", width: "100%", right: 0, transform: "translateY(-100%)"}}>PASSWORD</div>
        <div style={{ background: "#eccbc4", width: "100%", height: "50px" }} />
        <input
          type="text"
          placeholder="enter password here"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ background: "transparent", boxSizing: "border-box", color: "rgb(43, 57, 88)", fontFamily: "Kanit", fontSize: "18px", height: "50px", left: 0, paddingLeft: "10px", transform: "translateY(-100%)", width: "100%"}}
        />           

        <br/><br/>
        <Link to={`/account/new${next ? `?next=${next}` : ''}`} className="minor-link">new user</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={`/account/settings/password/forgot${next ? `?next=${next}` : ''}`} className="minor-link">forgot password?</Link>
        <br/><br/><br/><br/>
        <StylishButton className="acct-login-button" onClick={handleLogin} text="Login"/>
    </section>
    );         
  }
};
LoginPage.propTypes = {
  router: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = state => pick(state, ['router', 'user']);

export default connect(mapStateToProps)(LoginPage);
