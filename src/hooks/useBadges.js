import { useEffectOnce } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import getAllBadges from '../actions/get-all-badges';

export default function useBadges () {
    const dispatch = useDispatch();
    const badges = useSelector(state => state.badges);
    useEffectOnce(() => {
        dispatch(getAllBadges());
    });
    return badges || [];
}
