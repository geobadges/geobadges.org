import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { push } from 'connected-react-router';
import pick from 'lodash.pick';
import { PieChart } from 'react-minimal-pie-chart';
import { FaCog } from 'react-icons/fa';
import { BsTriangleFill } from 'react-icons/bs';

import useLoggedIn from '../hooks/useLoggedIn';

const MySettings = ({ user }) => {

    const loggedIn = useLoggedIn();

    if (!loggedIn) {
        return <Redirect to="/account/login?next=/account/profile/settings"/>;
    }

    return (
        <div className="my-settings">
            <h1>Name</h1>
            <span>{user.firstName} {user.lastName}</span>
            <h1>Emails</h1>
            {user.emails.map(({ caseVariants, email, primary, verified }) => {
                return (
                <div className="profile-email" key={email}>
                    <div>{email}</div>
                    {primary && <div className="tag">primary</div>}
                    <div className="tag">{verified ? 'verified' : 'unverified'}</div>
                </div>
                );
            })}
        </div>
    );
};

MySettings.propTypes = {

};

const mapStateToProps = state => pick(state, ['router', 'user']);

export default connect(mapStateToProps)(MySettings);
