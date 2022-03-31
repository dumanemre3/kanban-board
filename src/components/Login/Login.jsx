import React, { useState } from "react";
import "./Login.css";
import { login } from "../../services/api";
import { useDispatch } from "react-redux";
import { loginReducer } from "./../../features/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmitClicked(event) {
    event.preventDefault();
    login({username,password}).then((response) => {
      dispatch(loginReducer(response.data));
      navigate('/scrumboard');
      localStorage.setItem('loginedUser', JSON.stringify(response.data));
      toast.success('Login Succesfull');
    });
  }

  return (
    <div className="mt-5 container">
      <main className="form-signin mt-5">
        <form className="mt-5" onSubmit={onSubmitClicked}>
          <h1 className="h3 mb-5 fw-normal">Please sign in</h1>

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

          <button className="btn btn-primary w-100 btn btn-lg btn-primary" type="submit">
            Login
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; Emre Duman</p>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
