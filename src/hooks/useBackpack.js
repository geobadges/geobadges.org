import { useEffectOnce } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import getBackpack from '../actions/get-backpack';

export default function useBackpack () {
    const dispatch = useDispatch();
    const backpack = useSelector(state => state.backpack);
    useEffectOnce(() => {
        dispatch(getBackpack());
    });
    return backpack || [];
}