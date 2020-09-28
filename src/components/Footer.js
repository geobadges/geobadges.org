import React from 'react';
import GeoSurgeLogo from '../images/geosurge-logo-on-dark.svg';

const FooterSpacing = () => {
    const repetition = 15;
    const innerHTML = "&nbsp;".repeat(repetition) + "|" + "&nbsp;".repeat(repetition);
    return <span dangerouslySetInnerHTML={{__html: innerHTML}}/>;
};

const Footer = () => {
    return (
        <footer id="main-geobadges-footer">
            <span><img id="gb-logo-in-footer" src="/static/images/geobadges-logo-ags.png"/><span> By the </span><a href="https://americangeo.org/">American Geographical Society</a><span><FooterSpacing/>ags@americangeo.org<FooterSpacing/>Built with </span><span dangerouslySetInnerHTML={{__html: GeoSurgeLogo}}></span><span> by </span><a href="https://github.com/geosurge">GeoSurge</a></span>
        </footer>
    );
};

export default Footer;
