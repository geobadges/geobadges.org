import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { push } from 'connected-react-router';
import pick from 'lodash.pick';
import { PieChart } from 'react-minimal-pie-chart';
import { FaCog } from 'react-icons/fa';
import { BsTriangleFill } from 'react-icons/bs';
import loadScript from 'easy-script-loader';

import BadgeList from './badges/BadgeList';
import getExtension from '../utils/get-extension';
import loadArrayBuffer from '../utils/load-array-buffer';
import StylishButton from '../components/StylishButton';
import useBackpack from '../hooks/useBackpack';

const MyBadges = ({ }) => {
    const backpack = useBackpack();
    const numBadges = backpack?.length;

    const handleExport = () => {
        console.log("handling export");
        Promise.all([
            loadScript('/static/js/jszip.min.js'),
            loadScript('/static/js/FileSaver.min.js')
        ]).then(() => {
            console.log("loaded jszip and FileSaver.js!");
            const zip = JSZip();
            const dir = zip.folder("my_badges");
            const promises = backpack.map(({ badgeclassName, image }) => {
                const filename = badgeclassName.toLowerCase() + getExtension(image);
                return loadArrayBuffer(image).then(arrayBuffer => { dir.file(filename, arrayBuffer) });
            });
            console.log("promises kept");
            Promise.all(promises).then(() => {
                zip.generateAsync({ type:"blob" }).then(content => {
                    saveAs(content, "my_badges.zip");
                });
            });
        });
    };

    return (
        <div className="my-badges-wrapper">
            <div className="my-badges">
                {numBadges === 0 && <div>You have not earned any badges yet.</div>}
                {numBadges > 0 && <BadgeList badges={backpack} />}
            </div>
            <div id="my-badges-footer">
                <StylishButton text="Upload Badge"/>
                <StylishButton text="Export Badges" onClick={handleExport}/>
            </div>
        </div>
    );
};

MyBadges.propTypes = {

};

const mapStateToProps = state => pick(state, ['backpack', 'router', 'user']);

export default connect(mapStateToProps)(MyBadges);
