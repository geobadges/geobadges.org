import { useSelector } from 'react-redux';

export default function useLoggedIn () {
    return useSelector(state => state.user) !== null;
}
