import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import useBadge from '../../hooks/useBadge';

const BadgeCard = ({ entityId }) => {
    console.log("entityId:", entityId);
    const badge = useBadge(entityId);
    console.log("badge:", badge);
    const { awarded, duration, image, issuer, name, skill } = badge;
 
    return (
        <div className="badge-card">
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
    );
};
BadgeCard.propTypes = {
    entityId: PropTypes.string.isRequired
};

export default BadgeCard;