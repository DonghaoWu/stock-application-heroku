import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth.action'

const Navbar = ({ auth, logout }) => {
    const authLinks = (
        <ul>
            {auth.user ? <li>Welcome, {auth.user.name}</li> : null}
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/transaction">Transaction</Link></li>
            <li>
                <button className="navbar-logout-button" onClick={logout} href='/'>Logout</button>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"> Stock-app</Link>
            </h1>
            {
                !auth.loading && (<Fragment>
                    {
                        auth.isAuthenticated ? authLinks : guestLinks
                    }
                </Fragment>)
            }
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
