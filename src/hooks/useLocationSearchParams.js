import { useLocation } from 'react-router-dom';

export default () => {
    const params = {};
    useLocation().search.split(/\?|\&/g).forEach(str => {
        const [ key, value ] = str.split('=');
        if (key && value) {
            params[key] = value;
        }
    });
    return params;
};
