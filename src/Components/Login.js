import { useState } from "react";
import { Toast } from "./Toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts";

export function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");

  const { loginWithCredentials } = useAuth();

  async function loginHandler(e,userEmail,password) {
    e.preventDefault();
    const status =await  loginWithCredentials(userEmail, password);
 
    status && navigate(state?.from ? state.from : "/productsListingPage");
  }

  function showHidePassword() {
    inputType === "password" ? setInputType("text") : setInputType("password");
  }

  return (
    <div>
      <Toast />
      <form className="login-form">
        <h2 className="login-form__heading">Login</h2>
        <div className="login-form__fields-wrapper">
          <label>UserEmail</label>
          <div className="input-field-wrapper">
            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="username-input"
              type="text"
              placeholder="Email"
              required
            />
          </div>
          <br />
          <label>Password</label>
          <div className="input-field-wrapper">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field-2"
              type={inputType}
              placeholder="Enter password"
              required
            />
            <button
              onClick={showHidePassword}
              className="btn btn-secondary basic-addon-2"
              type="button"
            >
              <i className="far fa-eye-slash"></i>
            </button>
          </div>

          <button
            type="submit"
            onClick={(e)=>loginHandler(e,userEmail,password)}
            className="btn btn-primary stretch"
          >
            {" "}
            Login{" "}
          </button>
          <p className="small signup">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")} className="signup-link">
              {" "}
              Signup{" "}
            </span>
          </p>
        </div>
        <button  className="btn btn-primary stretch" onClick={(e)=>{e.preventDefault() ;setUserEmail("tester@gmail.com");setPassword("Tester@123");loginHandler(e,"tester@gmail.com","Tester@123")}}>Use Guest Credentials</button>
      </form>
    </div>
  );
}
