import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../services/authService';
import usePersistedState from '../hooks/usePersistedState';
import useCatchError from '../hooks/useCatchError';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState('auth', {});
  const [error, setError] = useCatchError('');

  const loginSubmitHandler = async (values) => {
      const result = await authService.login(values.email, values.password);
      setAuth(result);
      navigate('/');
      
      // const errorHandler = setError(respError);
      // errorHandler();


    // localStorage.setItem('accessToken', result.accessToken);

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

  const logoutHandler = async () => {
      await authService.logout();
      setAuth({});
      localStorage.removeItem('auth');
  };

  const resetHandler = async (newTokens) => {

    localStorage.removeItem('auth');
    setAuth(newTokens);
  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    resetHandler,
    role: auth.role,
    isAuthenticated: !!auth.access_token,
    error,
    setError,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;
