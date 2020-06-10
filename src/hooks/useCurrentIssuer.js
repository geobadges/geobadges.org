import { useSelector } from 'react-redux';

export default function useCurrentIssuer () {
    return useSelector(state => state.currentIssuer) || null;
}
