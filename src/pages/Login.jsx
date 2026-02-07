import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/userReducer";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/auth.css";
import { clearError } from "../reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user,
  );

  const [form, setForm] = useState({ email: "", password: "" });
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const from = location.state?.from?.pathname || "/my-posts";

  // Handle input change
  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const res = await dispatch(login(form));

    if (login.fulfilled.match(res)) {
      navigate(from, { replace: true });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        <p className="subtitle">
          Log in to continue writing and sharing knowledge.
        </p>

        {error && <div className="error-msg">{error}</div>}

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="switch-auth">
          Don’t have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
