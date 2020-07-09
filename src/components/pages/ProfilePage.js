import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { push } from 'connected-react-router';
import pick from 'lodash.pick';
import { PieChart } from 'react-minimal-pie-chart';
import { FaCog } from 'react-icons/fa';
import { BsTriangleFill } from 'react-icons/bs';

import MyBadges from '../MyBadges';
import MySettings from '../MySettings';

const ProfilePage = ({ user, router }) => {

  const dispatch = useDispatch();

  if (!user) {
    return <Redirect to="/account/login?next=/account/profile/settings"/>;
  }

  const subpages = [
    { title: 'Badges', value: 0.5, color: 'green' },
    { title: 'Settings', value: 0.5, color: 'purple'}
  ];
  
  return (
    <section id="profile" className="page">
      <div id="pie-chart-wrapper">
        <PieChart
          data={subpages}
          label={({ dataEntry }) => dataEntry.title}
          onClick={(event, index) => {
            console.log('CLICK', { event, index });
            const subpage = subpages[index].title;
            console.log("subpage:", subpage);
            if (subpage === 'Badges') {
              const url = `/account/profile/badges`;
              if (router.location.pathname !== url) {
                dispatch(push(url));
              }
            } else if (subpage === 'Settings') {
                const url = `/account/profile/settings`;
                if (router.location.pathname !== url) {
                  dispatch(push(url));
                }
              }
          }}
          viewBoxSize={[100, 100]}
        />
      </div>
      <div class="profile-subpage">
        <Switch>
          <Route path="/account/profile/settings" render={() => <MySettings/>} />
          <Route path="/account/profile/badges" render={() => <MyBadges/>} />
        </Switch>
      </div>
    </section>
  );
};
ProfilePage.propTypes = {
  router: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = state => pick(state, ['router', 'user']);

export default connect(mapStateToProps)(ProfilePage);
