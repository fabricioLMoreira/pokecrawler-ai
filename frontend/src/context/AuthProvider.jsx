import React, { createContext, useEffect, useRef, useState } from "react";
import keycloak from "../services/keycloak";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
  
    keycloak
      .init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
      })
      .then((authenticated) => {
        if (authenticated) {
          // AQUI ⬇️
          setToken(keycloak.token);
          setUser(keycloak.tokenParsed?.preferred_username);
          localStorage.setItem("access_token", keycloak.token);
        } else {
          console.warn("Não autenticado");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao iniciar Keycloak:", err);
        setIsLoading(false);
      });
  }, []);

  const login = () => keycloak.login();
  const logout = () => {
    localStorage.removeItem("access_token");
    keycloak.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
  
};

export default AuthProvider;
