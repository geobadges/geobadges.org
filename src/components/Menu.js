import React from 'react';
import PropTypes from 'prop-types';

import MenuOption from './MenuOption';

const Menu = ({ }) => {
  return (
    <ul className="gb-menu">
      <MenuOption to="/home" pageName="Home"/>
      <MenuOption to="/badges" pageName="Bades"/>
      <MenuOption to="/issuers" pageName="Issuers"/>
      <MenuOption to="/account" pageName="Account"/>
      <MenuOption to="/resources" pageName="Resources"/>
    </ul>
  );
};

Menu.propTypes = {

};

export default Menu;
