import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { push } from 'connected-react-router';
import pick from 'lodash.pick';
import { PieChart } from 'react-minimal-pie-chart';
import { FaCog } from 'react-icons/fa';
import { BsTriangleFill } from 'react-icons/bs';

const MyBadges = ({ }) => {
    return (
        <div className="my-badges-wrapper">
            <div className="my-badges">

            </div>
        </div>
    );
};

MyBadges.propTypes = {

};

const mapStateToProps = state => pick(state, ['router', 'user']);

export default connect(mapStateToProps)(MyBadges);
