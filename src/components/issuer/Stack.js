import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import useIssuer from '../../hooks/useIssuer';

import TopCard from './TopCard';
import StatsCard from './StatsCard';

const Issuer = ({ entityId }) => {
    const issuer = useIssuer(entityId);
    const { name, image } = issuer;
    return (
        <div className="issuer" entity-id={entityId}>
            <ul className="issuer-card-stack">
                <TopCard name={name} image={image}/>
                <StatsCard entityId={entityId} />
            </ul>
        </div>
    );
};

Issuer.propTypes = {
    entityId: PropTypes.string.isRequired
};

export default Issuer;