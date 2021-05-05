import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../Users";
export function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");

  function navigationHandler() {
    Users.push({ username: userName, password: password });
    navigate("/login");
  }

  function showHidePassword() {
    inputType === "password" ? setInputType("text") : setInputType("password");
  }

  return (
    <form className="login-form">
      <h2 className="login-form__heading">Signup</h2>

      <div className="login-form__fields-wrapper">
        <label>Username</label>
        <div className="input-field-wrapper">
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="username-input"
            type="text"
            placeholder="Username"
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
          />
          <button
            onClick={showHidePassword}
            className="btn btn-secondary basic-addon-2"
            type="button"
          >
            <i class="far fa-eye-slash"></i>
          </button>
        </div>
        <br />
        <label>Confirm Password</label>
        <div className="input-field-wrapper">
          <input
            className="input-field-2 plain-input"
            type="password"
            placeholder="Enter password"
          />
        </div>

        <button onClick={navigationHandler} className="btn btn-primary stretch">
          {" "}
          Signup{" "}
        </button>
      </div>
    </form>
  );
}
