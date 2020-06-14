import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import classnames from 'classnames';
import pick from 'lodash.pick';

import useIssuer from '../../hooks/useIssuer';
import useRouteMatchParams from '../../hooks/useRouteMatchParams';

const ConnectCard = ({ entityId, router }) => {
    const dispatch = useDispatch();

    const { issuerId, issuerCard } = useRouteMatchParams();
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
        if (isIssuerSelected && !isCardSelected) {
            const url = `/issuers/${entityId}/connect`;
            if (router.location.pathname !== url) {
                dispatch(push(url));
            }
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

const mapStateToProps = state => pick(state, ['issuers', 'router', 'user']);

export default connect(mapStateToProps)(ConnectCard);