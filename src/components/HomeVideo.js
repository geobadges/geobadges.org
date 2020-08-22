import React, { useRef } from 'react'
import PropTypes from 'prop-types';
import videoContent from '../content/home.md';
import FaPlayLight from '../images/play-light.svg';
import { FaTimes } from 'react-icons/fa';



const HomeVideo = () => {
    const vidRef = useRef(null);

    const handlePlayVideo = () => {
        const { current: video } = vidRef;
        video.play();
        video.setAttribute('active', true);
    };
    
    const escapeVideo = () => {
        const { current: video } = vidRef;
        video.setAttribute('active', false);
        video.load();
    }

    
    return (
        <section id='home-video'>
            <img id='home-video-img' src='/static/images/home-video.png' />
            <div id='overlay'></div>
            <div id='video-title'>Leveraging the Experience of the Global Community</div>
            <div id='video-content' dangerouslySetInnerHTML={{__html: videoContent}}></div>
            <div id='play-btn' title='play video' onClick={handlePlayVideo} dangerouslySetInnerHTML={{__html: FaPlayLight}}/>
            <video id='mp4' controls ref={vidRef}>
                <source src='/static/images/geobadges.mp4' type="video/mp4" />
            </video> 
            <div id="video-close-icon" onClick={escapeVideo}><FaTimes/></div>
        </section>
    );
};

HomeVideo.propTypes = {

};

export default HomeVideo;