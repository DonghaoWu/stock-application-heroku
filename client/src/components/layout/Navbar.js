import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth.action';

const Navbar = ({ email, isAuthenticated, logout, admin }) => {
  const authLinks = (
    <ul>
      {email ? <li>Welcome, {email}</li> : null}
      {admin ? (
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      ) : null}
      <li>
        <Link to="/portfolio">Portfolio</Link>
      </li>
      <li>
        <Link to="/transaction">Transaction</Link>
      </li>
      <li>
        <button className="navbar-logout-button" onClick={logout} href="/">
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"> Stock-app</Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.auth.user.email,
  admin: state.auth.user.admin,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
