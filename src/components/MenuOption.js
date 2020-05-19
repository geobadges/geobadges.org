import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuOption = ({ to, pageName }) => {
    return (
        <li className="gb-menu-option">
            <NavLink to={to} activeClassName="selected">
                <span>{pageName}</span>
            </NavLink>
        </li>
    );
};

MenuOption.propTypes = {
    to: PropTypes.string,
    pageName: PropTypes.string
};

export default MenuOption;
