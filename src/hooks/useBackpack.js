import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdate } from 'react-use';

import getBackpack from '../actions/get-backpack';

export default function useBackpack () {
    const dispatch = useDispatch();
    const update = useUpdate();
    const auth = useSelector(state => state.auth);
    console.warn("auth is:", auth);
    const backpack = useSelector(state => state.backpack);
    useEffect(() => {
        console.warn("inside useBackpack useEffect", { auth, backpack });
        if (!auth) return;
        dispatch(getBackpack());
        update();
    }, [auth]);
    return backpack || [];
}