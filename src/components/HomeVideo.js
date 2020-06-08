import React from 'react';
import PropTypes from 'prop-types';
import videoContent from '../content/home.md';

const HomeVideo = () => {
    return (
        <section id="home-video">
            <img id='home-video-img' src='/static/images/home-video.png' />
            <div id='overlay'></div>
            <div id='video-title'>Leveraging the Experience of the Global Community</div>
            <div id='video-content' dangerouslySetInnerHTML={{__html: videoContent}}></div>
        </section>
    );
};

HomeVideo.propTypes = {

};

export default HomeVideo;