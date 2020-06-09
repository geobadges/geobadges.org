import { useSelector } from 'react-redux';

export default function useCurrentBadge () {
    return useSelector(state => state.currentBadge) || null;
}
