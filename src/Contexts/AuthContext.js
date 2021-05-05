import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../Users";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  useEffect(() => {
    const result = JSON.parse(localStorage?.getItem("login"));
    result?.loginStatus && setIsLoggedIn(true);
  }, []);

  function loginWithCredentials(username, password) {
    const result = Users.find((user) => user.username === username);
    if (result?.password === password) {
      setIsLoggedIn(true);
      showToast("Login successfull !", "success");
      localStorage?.setItem("login", JSON.stringify({ loginStatus: true }));
      return true;
    } else {
      showToast("Incorrect details ! Plz try again", "failure");
    }
  }

  function logoutHandler() {
    localStorage?.removeItem("login");
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loginWithCredentials, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
