import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pick from 'lodash.pick';

import MenuOption from './MenuOption';

const Menu = ({ menu }) => {
  return (
    <ul className="gb-menu" data-display-menu={menu}>
      <MenuOption to="/home" pageName="Home"/>
      <MenuOption to="/badges" pageName="Badges"/>
      <MenuOption to="/issuers" pageName="Issuers"/>
      <MenuOption to="/account" pageName="Account"/>
      <MenuOption to="/resources" pageName="Resources"/>
    </ul>
  );
};

Menu.propTypes = {
  menu: PropTypes.bool.isRequired
};

const mapStateToProps = state => pick(state, ['menu']);

export default connect(mapStateToProps)(Menu);
