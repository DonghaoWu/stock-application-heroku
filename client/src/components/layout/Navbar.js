import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'

const Navbar = props => {
    const { logout, auth } = props;
    const authLinks = (
        <ul>
            {auth.user ? <li>Welcom, {auth.user.name}</li> : null}
            <li><Link to="#">Portfolio</Link></li>
            <li><Link to="#">Transaction</Link></li>
            <li>
                <a onClick={logout} href='/'>Logout</a>
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

export default connect(mapStateToProps, { logout })(Navbar);
