import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToggle } from 'react-use';
import classnames from 'classnames';

import setCurrentBadge from '../../actions/set-current-badge';
import useBadge from '../../hooks/useBadge';
import useCurrentBadge from '../../hooks/useCurrentBadge';

const BadgeCard = ({ entityId }) => {
    console.log("rendering BadgeCard with entityId, entityId", entityId);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log("entityId:", entityId);
    const badge = useBadge(entityId);
    console.log("badge:", badge);
    const currentBadge = useCurrentBadge();

    const { awarded, duration, image, issuer, name, skill } = badge;

    const selected = badge === currentBadge;

    // const handleClick = () => {
    //     console.log("clicked badge:", badge);
    //     if (!selected) {
    //         dispatch(setCurrentBadge(badge));
    //         const url = `/badges/${badge.entityId}/overview`;
    //         console.log("pushing url:", url);
    //         history.push(url);
    //     }
    // };

    return (
        <div className="badge-card-wrapper">
            <Link to={`/badges/${badge.entityId}/overview`}>
                <div className="badge-card-front badge-card">
                    <div className="badge-card-img-wrapper">
                        <img src={image}/>
                    </div>
                    <div className="badge-card-title">{name}</div>
                    <div className="badge-card-issuer">{issuer.name}</div>
                    <table className="badge-stats">
                        <tbody>
                            <tr className="badge-stats-values">
                                <td>{skill || '?'}</td>
                                <td>{awarded || '?'}</td>
                                <td>{duration || '?'}</td>
                            </tr>
                            <tr className="badge-stats-keys">
                                <td>level</td>
                                <td>awarded</td>
                                <td>duration</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Link>
        </div>
    );
};
BadgeCard.propTypes = {
    entityId: PropTypes.string.isRequired
};

export default BadgeCard;