import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Menu = ({ }) => {
  return (<>
    <div>Menu</div>
    <ul>
      <NavLink to="/home" activeClassName="selected">Home</NavLink>
      <NavLink to="/badges" activeClassName="selected">Badges</NavLink>
      <NavLink to="/issuers" activeClassName="selected">Issuers</NavLink>
      <NavLink to="/account" activeClassName="selected">Account</NavLink>
      <NavLink to="/resources" activeClassName="selected">Resources</NavLink>
    </ul></>
  );
};

Menu.propTypes = {

};

export default Menu;
