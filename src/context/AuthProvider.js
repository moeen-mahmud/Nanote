import React, { createContext } from "react";
import useFirebase from "../hooks/useFirebse";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const allAuthContext = useFirebase();
  return (
    <AuthContext.Provider value={allAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
