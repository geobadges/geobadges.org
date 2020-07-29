import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useCounter, useMeasure, useUpdate } from 'react-use';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import classnames from 'classnames';

import BadgeCard from './BadgeCard';

// cards are actually 180px wide, but want to add some extra padding
const CARD_OFFSET = 3;
const CARD_SIZE = 180 + CARD_OFFSET * 2;

const BadgeRow = ({ badges, title }) => {

    const update = useUpdate();

    const ref = createRef(null);

    // defaults page size to width of badges page minus padding
    const container = document.getElementById("badges");
    const containerStyle = getComputedStyle(container);
    const [containerSize, setContainerSize] = useState(
        container.clientWidth
        - Number.parseFloat(containerStyle.paddingLeft.replace("px",""))
        - Number.parseFloat(containerStyle.paddingRight.replace("px",""))
    );

    const pageSize = Math.floor(containerSize / CARD_SIZE);
    console.log("pageSize:", pageSize);

    const slides = badges.map(({ entityId }) => {
        const key = title + '-' + entityId;
        return <BadgeCard entityId={entityId} key={key}/>;
    });

    const [page, { inc: nextPage, dec: prevPage, set: setPage }] = useCounter(0);

    const count = badges.length;

    window.addEventListener("resize", update);

    return (
        <div className="badge-row">
            <div className="badge-row-title">{title}</div>
            <div className={classnames("badge-row-carousel", { "hide-dots": count <= pageSize })}>
                <Carousel className="badge-carousel"
                    onChange={setPage}
                    value={page * pageSize}
                    slidesPerPage={pageSize}
                    slides={slides}
                    offset={CARD_OFFSET}
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
