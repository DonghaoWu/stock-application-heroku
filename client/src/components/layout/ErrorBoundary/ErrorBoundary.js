import React, { Fragment } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ErrorBoundary = ({ isAuthenticated }) => {
  const authLinks = (
    <div className="landing-buttons">
      <Link to="/portfolio" className="btn btn-success">
        Portfolio
      </Link>
      <Link to="/transaction" className="btn btn-success">
        Transactions
      </Link>
    </div>
  );

  const guestLinks = (
    <div className="landing-buttons">
      <Link to="/register" className="btn btn-primary">
        Sign Up
      </Link>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
    </div>
  );

  return (
    <div className="error-image-overlay">
      <div className="error-image-container"></div>
      <div className="error-image-text">Sorry That Page Doesn't Exist.</div>
      <div className="landing-buttons">
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ErrorBoundary);
