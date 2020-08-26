import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import classnames from 'classnames';
import pick from 'lodash.pick';

import useIssuer from '../../hooks/useIssuer';
import useRouteMatchParams from '../../hooks/useRouteMatchParams';

const IssuerTitleCard = ({ entityId, router }) => {
    // console.log("starting IssuerTitleCard with router:", router);
    const dispatch = useDispatch();
    const { name, image } = useIssuer(entityId);
    const handleClick = () => {
        const url = `/issuers/${entityId}/title`;
        if (router.location.pathname !== url) {
            dispatch(push(url));
        }
    };

    const { issuerId, issuerCard }  = useRouteMatchParams();
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
                {image && <img src={image} alt={`Logo for ${name}`}/>}
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

const mapStateToProps = state => pick(state, ['issuers', 'router', 'user']);

export default connect(mapStateToProps)(IssuerTitleCard);
