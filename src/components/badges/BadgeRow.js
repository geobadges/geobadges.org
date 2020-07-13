import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCounter } from 'react-use';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import BadgeCard from './BadgeCard';


const BadgeRow = ({ badges, title }) => {

    const pageSize = 5;

    const slides = badges.map(({ entityId }) => {
        const key = title + '-' + entityId;
        return <BadgeCard entityId={entityId} key={key}/>;
    });

    const [page, { inc: nextPage, dec: prevPage, set: setPage }] = useCounter(0);

    const count = badges.length;

    return (
        <div className="badge-row">
            <div className="badge-row-title">{title}</div>
            <div className="badge-row-carousel">
                <Carousel className="badge-carousel"
                    onChange={setPage}
                    value={page * pageSize}
                    slidesPerPage={5}
                    slides={slides}
                    offset={6}
                />
                <Dots
                    number={Math.ceil(count / pageSize)}
                    onChange={setPage}
                    value={page}
                />
            </div>
        </div>
    );
};
BadgeRow.propTypes = {
    badges: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    })).isRequired,
    title: PropTypes.string.isRequired
};

export default BadgeRow;
