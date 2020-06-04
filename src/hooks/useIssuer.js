import { useSelector } from 'react-redux';

export default function useIssuer (entityId) {
    const issuers = useSelector(state => state.issuers) || [];
    const issuer = issuers.find(i => i.entityId === entityId);
    return issuer;
}
