import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RiLoginCircleLine } from 'react-icons/ri';

const Welcome = () => {
    return (
        <section id="home-welcome">
            <div id="text-content">
                <h1 id='geo'>GEO</h1>
                <h1 id='badges'>BADGES</h1>
                <h3 id='description'>Geographic microcredentials brought to you by the American Geographical Society</h3>
                <Link to="/badges" id='start-collecting'>
                    <h4>Start Collecting</h4><RiLoginCircleLine/>
                </Link>
            </div>
            <div id="welcome-image" />
        </section>
    );
};

export default Welcome;