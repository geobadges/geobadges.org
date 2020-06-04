import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCounter } from 'react-use';

import BadgeCard from './BadgeCard';

const BadgeRow = ({ badges, title }) => {
    const [page, { inc: nextPage, dec: prevPage }] = useCounter(0);
    return (
        <div className="badge-row">
            <div className="badge-row-title">{title}</div>
            <div className="badge-row-carousel">
                {badges.map(({ entityId }) => {
                    return <BadgeCard entityId={entityId} key={entityId}/>;
                })}
            </div>
        </div>
    );
};
BadgeRow.propTypes = {
    badges: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    })).isRequired,
    title: PropTypes.string.isRequired
};

export default BadgeRow;
