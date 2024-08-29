import React, { useState } from "react";
import "./AuthForm.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk, registerUserThunk } from "../../redux/slices/authSlice";

function AuthComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage", profileImage);
    dispatch(registerUserThunk(formData));
  };

  return (
    <div className="container">
      <div className="box">
        <div className="toggle">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        <div className="form-wrapper">
          {isLogin ? (
            <form id="login-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn">
                Login
              </button>
            </form>
          ) : (
            <form id="register-form" onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
                required
              />
              <button type="submit" className="submit-btn">
                Register
              </button>
            </form>
          )}
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>Error: {error}</p>}
        </div>
      </div>
    </div>
  );
}

export default AuthComponent;
