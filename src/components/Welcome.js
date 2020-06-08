import React from 'react';
import PropTypes from 'prop-types';
import { RiLoginCircleLine } from 'react-icons/ri';

const Welcome = () => {
    return (
        <section id="home-welcome">
            <h1 id='geo'>GEO</h1>
            <h1 id='badges'>BADGES</h1>
            <h3 id='description'>Geographic microcredentials brought to you by the American Geographical Society</h3>
            <div id='start-collecting'>Start Collecting<RiLoginCircleLine/></div>
        </section>
    );
};

export default Welcome;