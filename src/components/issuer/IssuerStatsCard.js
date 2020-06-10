import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useRouteMatch } from 'react-router-dom';
import classnames from 'classnames';


import Stats from '../Stats';
import useIssuer from '../../hooks/useIssuer';

const StatsCard = ({ entityId }) => {
    const dispatch = useDispatch();

    const match = useRouteMatch();
    const { issuerId, issuerCard } = match.params;
    const isIssuerSelected = issuerId === entityId;
    const isCardSelected = isIssuerSelected && issuerCard === 'stats';

    const { stats } = useIssuer(entityId);
    const { badges, learners, technologies } = stats;

    const className = classnames(
        'issuer-stats-card',
        'issuer-card',
        { 'issuer-card-selected': isCardSelected },
        { 'clickable': !isCardSelected }
    );
    const handleClick = () => {
        console.log("clicked connect");
        if (isIssuerSelected && !isCardSelected) {
            dispatch(push(`/issuers/${entityId}/stats`));
        }
    };
    return (
        <li className={className} onClick={handleClick}>
            <div className="badge-list-wrapper">
                Badge List
            </div>
            <Stats
                keys={['badges','learners','technologies']}
                values={[badges, learners, technologies]}
            />
        </li>
    );
};
StatsCard.propTypes = {
    entityId: PropTypes.string.isRequired,
};

export default StatsCard;