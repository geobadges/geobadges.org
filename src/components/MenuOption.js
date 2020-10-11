import React from 'react';
import { dispatch, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import hideMenu from '../actions/hide-menu';

const MenuOption = ({ to, pageName }) => {

    const dispatch = useDispatch();
    const closeMenu = () => dispatch(hideMenu());
    return (
        <li className="gb-menu-option">
            <NavLink to={to} activeClassName="selected" onClick={closeMenu}>
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
