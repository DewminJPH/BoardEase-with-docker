import React from "react";
import "./login.css";
import loginImage from "../Assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitCall = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);

      if (res.status === 200) {
        alert("Welcome: " + res.data.user.name);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Error logging in. Please check your credentials.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-image-side">
          <img src={loginImage} alt="Login" className="auth-image" />
        </div>

        <div className="auth-form-side">
          <div className="auth-tabs">
            <Link to="/signup" className="auth-tab">
              Signup
            </Link>
            <div className="auth-tab active">Login</div>
          </div>

          <form onSubmit={handleSubmit(submitCall)} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="auth-input"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <div className="errormessage">{errors.email.message}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="auth-input"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <div className="errormessage">{errors.password.message}</div>
              )}
            </div>

            <button type="submit" className="auth-submit-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;