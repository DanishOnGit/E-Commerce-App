import { useState } from "react";
import { Toast } from "./Toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts";

export function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");

  const { loginWithCredentials } = useAuth();

  function loginHandler(e) {
    e.preventDefault();
    const status = loginWithCredentials(userName, password);
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
          <label>Username</label>
          <div className="input-field-wrapper">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="username-input"
              type="text"
              placeholder="Username"
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
              <i class="far fa-eye-slash"></i>
            </button>
          </div>

          <button
            type="submit"
            onClick={loginHandler}
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
      </form>
    </div>
  );
}
