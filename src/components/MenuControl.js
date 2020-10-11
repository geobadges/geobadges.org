import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import pick from 'lodash.pick';

import hideMenu from '../actions/hide-menu';
import showMenu from '../actions/show-menu';

const MenuControl = ({ menu }) => {
    console.log("starting menucontrol with", {menu});
    const dispatch = useDispatch();

    const openMenu = () => dispatch(showMenu());
    const closeMenu = () => dispatch(hideMenu());

    if (menu) {
        return (
            <FaTimes className="gb-menu-control" onClick={closeMenu}/>
        );
    } else {
        return (
            <FaBars className="gb-menu-control" onClick={openMenu}/>
        );        
    }


};

MenuControl.propsTypes = {
    menu: PropTypes.bool.isRequired
};

const mapStateToProps = state => pick(state, ['menu']);

export default connect(mapStateToProps)(MenuControl);
