import { useSelector } from 'react-redux';

export const getJWTToken = () => {
    const { jwt } = useSelector((state: any) => state.auth);
    return jwt;
}