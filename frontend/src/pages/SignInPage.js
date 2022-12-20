import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../features/authentication/auth-service";
import { toast } from "react-toastify";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  function onChangeUsername(event) {
    setUsername(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSignIn(event) {
    event.preventDefault();

    const staff = {
      username: username,
      password: password,
    };

    AuthService.login(staff.username, staff.password).then(
      (data) => {
        if (data.success) {
          navigate("/ManageOrder");
          window.location.reload();
          toast("Login successfully!");
        } else {
          toast.error(data.message);
          clearForm(null);
        }
      },
      (error) => {
        toast.error("Server Error!");
      }
    );
  }

  function clearForm(event) {
    setUsername("");
    setPassword("");
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 mx-auto" align="center">
          <h2 className="mt-5">Sign In</h2>
          <div className="card">
            <div className="card-body signin-form">
              <form onSubmit={handleSignIn} id="signinForm" noValidate>
                <div class="mb-3 row">
                  <label for="staticEmail" class="col-sm-3 col-form-label">Username</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      required
                      value={username}
                      onChange={onChangeUsername}
                    />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">Password</label>
                  <div class="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                      value={password}
                      onChange={onChangePassword}
                    />
                  </div>
                </div>
                <div>
                  <button
                    id="signInButton"
                    type="submit"
                    className="btn btn-primary"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
