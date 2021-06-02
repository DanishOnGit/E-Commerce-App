import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utilities";
export function Signup() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [userName, setUserName] = useState("");

  function showHidePassword() {
    inputType === "password" ? setInputType("text") : setInputType("password");
  }

  const createUser = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        method: "POST",
        url: `${API_URL}/users-ecomm`,
        data: {
          name: userName,
          email: userEmail,
          password: password,
        },
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="login-form" onSubmit={createUser}>
      <h2 className="login-form__heading">Signup</h2>

      <div className="login-form__fields-wrapper">
        <label>userName</label>
        <div className="input-field-wrapper">
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="username-input"
            type="text"
            placeholder="Name"
          />
        </div>
        <br />
        <label>userEmail</label>
        <div className="input-field-wrapper">
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="username-input"
            type="text"
            placeholder="Email"
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

        <button className="btn btn-primary stretch"> Signup </button>
      </div>
    </form>
  );
}
