import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useRouteMatch } from 'react-router-dom';
import classnames from 'classnames';

import useIssuer from '../../hooks/useIssuer';

const ConnectCard = ({ entityId }) => {
    const dispatch = useDispatch();

    const match = useRouteMatch();
    const { issuerId, issuerCard } = match.params;
    const isIssuerSelected = issuerId === entityId;
    const isCardSelected = isIssuerSelected && issuerCard === 'connect';

    const { description, name } = useIssuer(entityId);

    const className = classnames(
        'issuer-connect-card',
        'issuer-card',
        { 'issuer-card-selected': isCardSelected },
        { 'clickable': !isCardSelected }
    );

    const handleClick = () => {
        console.log("clicked connect");
        if (isIssuerSelected && !isCardSelected) {
            dispatch(push(`/issuers/${entityId}/connect`));
        }
    };
    return (
        <li className={className} onClick={handleClick}>
            <div className="issuer-connect-card-about">About {name}</div>
            <div className="issuer-description-wrapper">
                <div className="issuer-description">{description}</div>
            </div>
            <div className="issuer-social">Social Media Links
            </div>
            <div className="issuer-connect-card-title">Connect</div>
        </li>
    );
};
ConnectCard.propTypes = {
    entityId: PropTypes.string.isRequired,
};

export default ConnectCard;