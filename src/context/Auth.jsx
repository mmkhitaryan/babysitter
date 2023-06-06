import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  const logIn = useCallback((token) => {
    localStorage.setItem('access_token', token);
    setIsAuthenticated(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    document.location.reload();
  }, []);

  const value = useMemo(() => {
    return {
      isAuthenticated,
      logIn,
      logOut,
    };
  }, [isAuthenticated, logIn, logOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
