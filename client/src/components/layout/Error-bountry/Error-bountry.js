import React, { Fragment } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ErrorBoundary = ({ loading, isAuthenticated }) => {
  const authLinks = (
    <div className="landing-buttons">
      <Link to="/portfolio" className="btn btn-primary">
        Portfolio
      </Link>
      <Link to="/transaction" className="btn btn-primary">
        Transactions
      </Link>
    </div>
  );

  const guestLinks = (
    <div className="landing-buttons">
      <Link to="/register" className="btn btn-primary">
        Sign Up
      </Link>
      <Link to="/login" className="btn btn-light">
        Login
      </Link>
    </div>
  );

  return (
    <div className="error-image-overlay">
      <div className="error-image-container"></div>
      <div className="error-image-text">Sorry this page is not existed.</div>
      <div className="landing-buttons">
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(ErrorBoundary);
