import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../reducers/userReducer";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/auth.css";
import { clearError } from "../reducers/userReducer";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading } = useSelector((state) => state.user);

  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [errors, setErrors] = useState({});

  // Validate input
  const validateForm = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (!form.username) {
      newErrors.username = "Username is required.";
    } else if (form.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const from = location.state?.from?.pathname || "/create-post";

  // Handle input change
  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const res = await dispatch(signup(form));

    if (signup.fulfilled.match(res)) {
      navigate(from, { replace: true });
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Welcome</h1>
        <p className="subtitle">
          Create Account to join writing and sharing knowledge.
        </p>

        {error && <div className="error-msg">{error}</div>}

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={form.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error-msg">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>

        <button className="btn full" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="switch-auth">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
