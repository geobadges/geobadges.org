import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useHistory, useRouteMatch } from "react-router-dom";
import classnames from 'classnames';

import useIssuer from '../../hooks/useIssuer';

const IssuerTitleCard = ({ entityId }) => {
    const dispatch = useDispatch();
    const { name, image } = useIssuer(entityId);
    const handleClick = () => {
        const url = `/issuers/${entityId}/title`;
        dispatch(push(url));
    };

    const match = useRouteMatch();
    const { issuerId, issuerCard } = match.params;
    const isIssuerSelected = issuerId === entityId;
    const isCardSelected = isIssuerSelected && issuerCard === 'title';

    const className = classnames(
        'issuer-title-card',
        'issuer-card',
        { 'issuer-card-selected': isCardSelected },
        { 'clickable': !isCardSelected }
    );
    return (
        <li className={className} onClick={handleClick}>
            <div className="img-wrapper">
                <img src={image} alt={`Logo for ${name}`}/>
            </div>
            <div className="issuer-name-bar">
                <div className="issuer-name">{name}</div>
            </div>
        </li>
    );
};
IssuerTitleCard.propTypes = {
    entityId: PropTypes.string.isRequired
};

export default IssuerTitleCard;