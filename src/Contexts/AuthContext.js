import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  API_URL,
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "../utilities";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const token = JSON.parse(localStorage?.getItem("userToken")) || {
    authToken: null,
    name: "",
    email: "",
  };
  if (token?.authToken) {
    setupAuthHeaderForServiceCalls(token?.authToken);
  }

  const [userToken, setUserToken] = useState(token?.authToken);
  const [userDetails, setUserDetails] = useState({
    name: token?.name,
    email: token?.email,
  });

  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    setupAuthExceptionHandler(logoutUser, navigate);
  }, []);

  async function loginWithCredentials(email, password) {
    try {
      const {
        data: { token, usersName, usersEmail },
        status,
      } = await axios({
        method: "POST",
        url: `${API_URL}/users/authenticate`,
        headers: { email: email, password: password },
      });

      if (status === 200) {
        setupAuthHeaderForServiceCalls(token);
        setUserToken(token);
        setUserDetails({ name: usersName, email: usersEmail });
        showToast("Login successfull !", "success");

        localStorage?.setItem(
          "userToken",
          JSON.stringify({
            authToken: token,
            name: usersName,
            email: usersEmail,
          })
        );
        return true;
      } else {
        showToast("Incorrect details ! Plz try again", "failure");
      }
    } catch (error) {
      console.log(error);
      showToast("Incorrect details ! Plz try again", "failure");
    }
  }

  function logoutUser() {
    localStorage?.removeItem("userToken");
    setUserToken(null);
    setUserDetails({name:"",email:""})
    setupAuthHeaderForServiceCalls(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        loginWithCredentials,
        logoutUser,
        userToken,
        userDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
