import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth.action';
import { setAlert } from '../../actions/alert.action';

const Login = ({ login, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      login({ email, password });
    } catch (err) {
      setAlert({
        msg: err,
        alertType: 'danger',
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="authpage-container">
      <h1 className="auth-header large">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign In Your Account
      </p>
      <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="auth-form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            name="email"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="auth-form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="auth-button">
          <input
            type="submit"
            className="auth-button btn btn-primary"
            value="Login"
          />
        </div>
      </form>
      <p className="auth-notice my-1">
        Don't have an account? <Link to="/register">Register </Link>here
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  login: (userCredentials) => dispatch(login(userCredentials)),
  setAlert: (info) => dispatch(setAlert(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
