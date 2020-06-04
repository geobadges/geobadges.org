import { useSelector } from 'react-redux';

export default function useBadge (entityId) {
    const badges = useSelector(state => state.badges) || [];
    const badge = badges.find(i => i.entityId === entityId);
    return badge;
}
