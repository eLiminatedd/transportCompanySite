import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../services/AuthService';
import usePersistedState from '../hooks/usePersistedState';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState('auth', {});

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);

    setAuth(result);

    // localStorage.setItem('accessToken', result.accessToken);

    navigate('/');
  };

  const registerSubmitHandler = async (values) => {
    const result = await authService.register(
        values.email, 
        values.username, 
        values.password,
        values.phone,
        values.companyName,
        values.firstName,
        values.lastName,
        );

    setAuth(result);

    // localStorage.setItem('accessToken', result.accessToken);

    navigate('/');
  };

  const logoutHandler = () => {
    setAuth({});
    localStorage.removeItem('auth');
  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    role: auth.role,
    isAuthenticated: !!auth.access_token,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;
