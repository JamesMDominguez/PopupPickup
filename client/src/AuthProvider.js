import React, { useContext, useState } from "react";
import axios from 'axios'

const AuthStateContext = React.createContext();

export function AuthStateProvider({ children }) {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null)
    axios.get('/api/logout')
  }

  const login = (newUser) => {
    setUser(newUser)
  }

  const value = {
    user,
    logout,
    login
  };

  return <AuthStateContext.Provider value={value} children={children} />;
}

export function useAuthState() {
  return useContext(AuthStateContext);
}
