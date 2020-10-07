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
import Pixel from '../Pixel';
import useBackpack from "../../hooks/useBackpack";

const ProfilePage = ({ user, router }) => {

  const dispatch = useDispatch();
  const backpack = useBackpack();
  const count = backpack.length;

  console.log("backpack.length;", count);

  if (!user) {
    return <Redirect to="/account/login?next=/account/profile/badges"/>;
  }

  const subpages = [
    { title: 'Badges', value: 0.5, color: '#D7CDCC' },
    { title: 'Settings', value: 0.5, color: '#D7CDCC'}
  ];
  
  const color = "#D7CDCC";
  const common = { paddingLeft: 0, paddingTop: 50, size: 25, width: 25, height: 25 };
  return (
    <section id="profile" className="page">
      <div id="profile-name-bg">
        <Pixel color={color} column={4} opacity={0.85} row={0} {...common}/>
        <Pixel color={color} column={2} opacity={0.85} row={1} {...common}/>
        <Pixel color={color} column={4} opacity={0.30} row={1} {...common}/>
        <Pixel color={color} column={1} opacity={0.85} row={2} {...common}/>
        <Pixel color={color} column={2} opacity={0.85} row={3} {...common}/>
        <Pixel color={color} column={1} opacity={0.85} row={4} {...common}/>
      </div>
      <div id="profile-name">
        <div id="profile-name-first">{user.firstName}</div>
        <div id="profile-name-last">{user.lastName}</div>
        <div id="profile-backpack-size">{(count === 1 ? '1 Badge' : `${count} Badges`) + ' Earned'}</div>
      </div>
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
      <div className="profile-subpage">
        <Switch>
          <Route path="/account/profile/settings" render={() => <MySettings/>} />
          <Route path="/account/profile/badges" render={() => <MyBadges/>} />
          <Redirect to="/account/profile/badges"/>
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
