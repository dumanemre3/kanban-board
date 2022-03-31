import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../Login/Login.css";
import { register } from "../../services/api";
import { loginReducer } from "../../features/login/loginSlice";
import { toast } from "react-toastify";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmitClicked(event) {
    event.preventDefault();
    if (password === passwordConfirm) {
      register({
        username,
        password,
        passwordConfirm,
      })
        .then((response) => {
          dispatch(loginReducer(response.data));
          navigate('/scrumboard');
          toast.success('Register Succesfull');
        })
        .catch((err) => {
          console.log(err);
          alert("Could not register.");
        });
    } else {
      alert("Şifre uymuyor");
    }
  }

  return (
    <div className="mt-5 container">
      <main className="form-signin mt-5">
        <form className="mt-5" onSubmit={onSubmitClicked}>
          <h1 className="h3 mb-5 fw-normal">Please sign up</h1>

          <div className="form-floating mb-2">
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Enter username"
              required
            />
            <label for="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-2">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
            />
            <label for="floatingPassword">Password</label>
          </div>
          <div className="form-floating mb-2">
            <input
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              type="password"
              className="form-control"
              placeholder="Enter re-password"
              required
            />
            <label for="floatingPassword">Confirm Password</label>
          </div>

          <button
            className="btn btn-primary w-100 btn btn-lg btn-primary"
            type="submit"
          >
              Register
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; Emre Duman</p>
        </form>
      </main>
    </div>
  );
}

export default RegisterPage;
