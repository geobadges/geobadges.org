import React from 'react';
import PropTypes from 'prop-types';

import BadgeRow from '../badges/BadgeRow';
import useBadges from '../../hooks/useBadges';

const Badges = ({ }) => {
  const badges = useBadges() || [];
  console.log("badges:", badges);

  const rows = [
    // { title: 'Popular': filter: () => {}}
    {
      title: 'Beginner',
      badges: badges.filter(badge => badge.tags.some(t => t.toLowerCase().includes('beginner')))
    },
    {
      title: 'Advanced',
      badges: badges.filter(badge => badge.tags.some(t => t.toLowerCase().includes('advanced')))
    },
    {
      title: 'OpenStreetMap',
      badges: badges.filter(badge => badge.tags.some(t => t.toLowerCase().includes('osm') || t.toLowerCase().includes('openstreetmap')))
    },
    {
      title: 'Makers',
      badges: badges.filter(badge => badge.tags.some(t => t.toLowerCase().includes('diy') || t.toLowerCase().includes('maker')))
    }
  ].filter(row => row.badges.length > 0);

  return (
    <section id="badges" className="page">
      {rows.map(({ title, badges}) => {
        return <BadgeRow badges={badges} title={title} key={title} />
      })}
    </section>
  );
};

Badges.propTypes = {
};

export default Badges;
