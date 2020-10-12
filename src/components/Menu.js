import React from 'react';

import MenuOption from './MenuOption';

const Menu = () => {
  return (
    <ul className="gb-menu">
      <MenuOption to="/home" pageName="Home"/>
      <MenuOption to="/badges" pageName="Badges"/>
      <MenuOption to="/issuers" pageName="Issuers"/>
      <MenuOption to="/account" pageName="Account"/>
      <MenuOption to="/resources" pageName="Resources"/>
    </ul>
  );
};

export default Menu;
