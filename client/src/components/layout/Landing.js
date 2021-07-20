import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth.action';

const Landing = ({ logout, isAuthenticated }) => {
  const authLinks = (
    <div className="landing-buttons">
      <Link to="/portfolio" className="btn btn-primary">
        My Portfolio
      </Link>
      <Link to="/transaction" className="btn btn-primary">
        Transaction
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
    <section className="landing">
      <div className="dark-landing-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Fullstack Stock App</h1>
          <p className="lead">This is a web-based stock portfolio app.</p>
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
