import React from 'react';
import PropTypes from 'prop-types';

import useIssuer from '../../hooks/useIssuer';

const StatsCard = ({ entityId }) => {
    const issuer = useIssuer(entityId);
    return (
        <li className="stats-card">
        </li>
    );
};
StatsCard.propTypes = {
    entityId: PropTypes.string.isRequired,
};

export default StatsCard;