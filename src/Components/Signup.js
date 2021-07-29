import { useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utilities";
import { useAuth, useToast } from "../Contexts";
import { Action } from "history";

export function Signup() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [userName, setUserName] = useState("");

  const { showToast } = useToast();
  function showHidePassword() {
    inputType === "password" ? setInputType("text") : setInputType("password");
  }
  function validateForm(e) {
    e.preventDefault();
    let validationPassed = true;
    if (!/^.+@.+\.com$/.test(userEmail)) {
      validationPassed = false;
      errorDispatch({
        type: "SET_EMAIL_ERROR",
        payload: "enter a valid email",
      });
    } else {
      errorDispatch({ type: "SET_EMAIL_ERROR", payload: "" });
    }

    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(password)
    ) {
      validationPassed = false;
      errorDispatch({
        type: "SET_PASSWORD_ERROR",
        payload:
          "password must contain a number,special character,upper-case letter",
      });
    } else {
      errorDispatch({ type: "SET_PASSWORD_ERROR", payload: "" });
    }

    if(password!==confirmPassword){
      errorDispatch({type:"SET_PASSWORD_MATCH_ERROR",payload:"Passwords dont match"})
    }else {
      errorDispatch({ type: "SET_PASSWORD_MATCH_ERROR", payload: "" });
    }
    return validationPassed;
  }


  const createUser = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        method: "POST",
        url: `${API_URL}/users`,
        data: {
          name: userName,
          email: userEmail,
          password: password,
        },
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      showToast("Error signing up !","failure");
    }
  };


  function errorReducer(state, { type, payload }) {
    switch (type) {
      case "SET_EMAIL_ERROR": {
        return {
          ...state,
          emailError: payload,
        };
      }
      case "SET_PASSWORD_ERROR": {
        return {
          ...state,
          passwordError: payload,
        };
      }
      case "SET_PASSWORD_MATCH_ERROR":{
        return {
          ...state,
          matchPasswordError:payload
        }
      }
      default:
        throw new Error("Unknown action type !");
    }
  }

  const [errorState, errorDispatch] = useReducer(errorReducer, {
    emailError: "",
    passwordError: "",
    matchPasswordError: "",
  });


  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        if (validateForm(e)) {
          createUser(e);
        }
      }}
    >
      <h2 className="login-form__heading">Signup</h2>

      <div className="login-form__fields-wrapper">
        <label>Name</label>
        <div className="input-field-wrapper">
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="username-input"
            type="text"
            placeholder="Name"
            required
          />
        </div>
        <br />
        <label>Email</label>
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
        {errorState.emailError && <small className="form-error">{errorState.emailError}</small>}
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
        {errorState.passwordError && (
            <small className="form-error">{errorState.passwordError}</small>
          )}
        <br />
        <label>Confirm Password</label>
        <div className="input-field-wrapper">
          <input
             value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="username-input"
            type="password"
            placeholder="Confirm password"
            required
          />
         
        </div>
        {errorState.matchPasswordError && (
            <small className="form-error">{errorState.matchPasswordError}</small>
          )}
          <br/>
       
        <button className="btn btn-primary stretch"> Signup </button>
      </div>
    </form>
  );
}
