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
            <span><img id="gb-logo-in-footer" src="/static/images/geobadges-logo-ags.png"/><span className="gb-footer-by-the"> By the </span><a className="gb-footer-ags-link" href="https://americangeo.org/">American Geographical Society</a><span className="gb-footer-more"><FooterSpacing/>ags@americangeo.org<FooterSpacing/>Built with </span><span className="gb-footer-gs-logo" dangerouslySetInnerHTML={{__html: GeoSurgeLogo}}></span><span className="gb-footer-second-by"> by </span><a className="gb-footer-gs-link" href="https://github.com/geosurge">GeoSurge</a></span>
        </footer>
    );
};

export default Footer;
