import { useEffectOnce } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import getBadges from '../actions/get-badges';

export default function useBadges () {
    const dispatch = useDispatch();
    const badges = useSelector(state => state.badges);
    useEffectOnce(() => {
        dispatch(getBadges());
    });
    return badges || [];
}
