import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SignupImage from "../assets/signup.png";
import "./signup.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  
  const validate = () => {
    const newErrors = {};
    if (!form.name || form.name.length < 3) {
      newErrors.name = "Username must be at least 3 characters";
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    
    setErrors({});
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      if (res.status === 201) {
        alert("Registration Successful");
        setForm({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-image-side">
          <img src={SignupImage} alt="Signup" className="auth-image" />
        </div>

        <div className="auth-form-side">
          <div className="auth-tabs">
            <div className="auth-tab active">Signup</div>
            <Link to="/login" className="auth-tab">
              Login
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className={`auth-input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && <div className="errormessage">{errors.name}</div>}
            </div>

            <div className="form-group">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className={`auth-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <div className="errormessage">{errors.email}</div>}
            </div>

            <div className="form-group">
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className={`auth-input ${errors.password ? 'error' : ''}`}
              />
              {errors.password && <div className="errormessage">{errors.password}</div>}
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign Up
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Signup;