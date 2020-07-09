import API from '@geobadges/badgr-api-client';

const client = new API({
    endpoint: process.env.GEOBADGES_API_ENDPOINT
});

export default client;
