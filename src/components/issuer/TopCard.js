import React from 'react';
import PropTypes from 'prop-types';

const TopCard = ({ name, image }) => {
    return (
        <li className="top-card">
            <img src={image} alt={`Logo for ${name}`}/>
            <div className="issuer-name-bar">
                <div className="issuer-name">{name}</div>
            </div>
        </li>
    );
};
TopCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};

export default TopCard;