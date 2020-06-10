import { useEffectOnce } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import getIssuers from '../actions/get-issuers';

export default function useIssuers () {
    const dispatch = useDispatch();
    const issuers = useSelector(state => state.issuers);
    useEffectOnce(() => {
        dispatch(getIssuers());
    });
    return issuers || [] ;
}
