import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import classnames from 'classnames';
import pick from 'lodash.pick';

import { BadgesContext } from '../../context/badges';
import BadgeRow from '../badges/BadgeRow';
import useBadges from '../../hooks/useBadges';
import useCurrentBadge from '../../hooks/useCurrentBadge';

import BadgeDetails from '../../components/badges/BadgeDetails';

import INACTIVE_ISSUERS from '../../data/inactive-issuers';

const isLegacyBadge = badge => {
  return INACTIVE_ISSUERS.includes(badge.issuer.name);
};

const Badges = (props) => {
  // console.log("context is:", useContext(BadgesContext));
  // const location = useLocation();
  console.log("starting to render Badges with props", props);
  const badges = useBadges();
  console.log("badges:", badges);
  const currentBadge = useCurrentBadge();
  console.log("currentBadge:", currentBadge);

  let rows = [
    // { title: 'Popular': filter: () => {}}
    {
      title: 'Beginner',
      badges: badges.filter(badge => !isLegacyBadge(badge) && badge.tags.some(t => t.toLowerCase().includes('beginner')))
    },
        {
      title: 'Intermediate',
      badges: badges.filter(badge => !isLegacyBadge(badge) && badge.tags.some(t => t.toLowerCase().includes('intermediate')))
    },
    {
      title: 'Advanced',
      badges: badges.filter(badge => !isLegacyBadge(badge) && badge.tags.some(t => t.toLowerCase().includes('advanced')))
    },
    {
      title: 'YouthMappers Academy',
      badges: badges.filter(badge => !isLegacyBadge(badge) &&  badge.tags.some(t => t.toLowerCase().includes('youthmappersacademy')))
    },
    {
      title: 'OpenStreetMap',
      badges: badges.filter(badge => !isLegacyBadge(badge) && badge.tags.some(t => t.toLowerCase().includes('osm') || t.toLowerCase().includes('openstreetmap')))
    },
    {
      title: 'QGIS',
      badges: badges.filter(badge => !isLegacyBadge(badge) &&  badge.tags.some(t => t.toLowerCase().includes('qgis')))
    },
    {
      title: 'Human Geography',
      badges: badges.filter(badge => !isLegacyBadge(badge) && badge.tags.some(t => t.toLowerCase().includes('human geography')))
    },
        {
      title: 'Developer',
      badges: badges.filter(badge => !isLegacyBadge(badge) && badge.tags.some(t => t.toLowerCase().includes('developer') || t.toLowerCase().includes('code')))
    },
    {
      title: 'Makers',
      badges: badges.filter(badge => !isLegacyBadge(badge) && badge.tags.some(t => t.toLowerCase().includes('diy') || t.toLowerCase().includes('maker')))
    },
    {
      title: 'All',
      badges: badges.filter(badge => !isLegacyBadge(badge) && badge.image)
    },
    {
      title: 'Legacy',
      badges: badges.filter(badge => isLegacyBadge(badge))
    }
  ].filter(row => row.badges.length > 0);
  // rows = rows.concat(rows).concat(rows).concat(rows);

  const selected = currentBadge !== null;
  console.log("selected:", selected);

  return (
    <>
      <section id="badges" className={classnames('page', { 'no-scroll': selected })} >
        {rows.map(({ title, badges}) => {
          return <BadgeRow badges={badges} title={title} key={title} />
        })}
      </section>
      <Route path={`/badges/:badgeId/:tab`} render={() => <BadgeDetails/>}/>
    </>
  );
};

Badges.propTypes = {
};

const mapStateToProps = (state) => (
  pick(state, ['currentBadge', 'badges', 'router'])
);

export default connect(mapStateToProps)(Badges);
