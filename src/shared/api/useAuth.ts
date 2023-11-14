import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';

export const useAuth = () => {
    const { id, email, token } = useSelector((state: RootState) => state.user.user);

    return {
        isAuth: !!email,
        email: email,
        id: id,
        token: token,
    };
};