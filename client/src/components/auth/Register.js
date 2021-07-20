import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert.action';
import { register } from '../../actions/auth.action';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert({
        msg: 'Passwords do not match',
        alertType: 'danger',
      });
    } else {
      register({ name: name, email: email, password: password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="authpage-container">
      <h1 className="auth-header large">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="auth-form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
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
        <div className="auth-form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="auth-button">
          <input type="submit" className="btn btn-primary" value="Sign up" />
        </div>
      </form>
      <p className="auth-notice my-1">
        Already have an account? <Link to="/login">Login </Link>here
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  setAlert: (info) => dispatch(setAlert(info)),
  register: (userCredentials) => dispatch(register(userCredentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
