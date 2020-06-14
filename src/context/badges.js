import React, { createContext } from 'react';
import { useAsyncFn, useEffectOnce } from 'react-use';
import axios from 'axios';

export const BadgesContext = createContext();

export const BadgesProvider = ({ children }) => {
    const [badges, fetch] = useAsyncFn(async () => {
        const url = `${process.env.GEOBADGES_FUNCTIONS_ENDPOINT}/get-all-badges`;
        console.log("url:", url);

        const response = await axios.get(url);
        return response.data;
    });
    useEffectOnce(() => {fetch();});
    return <BadgesContext.Provider value={badges}>{children}</BadgesContext.Provider>;
};
