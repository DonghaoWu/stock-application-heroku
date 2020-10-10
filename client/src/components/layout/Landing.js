import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Landing = ({ logout, auth, history }) => {
    const authLinks = (
        <div className="buttons">
            <button onClick={logout} className="btn btn-danger" href='/'>Logout</button>
        </div>
    );

    const guestLinks = (
        <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
        </div>
    );
    return (
        <section className="landing">
            <div className="dark-landing-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Fullstack Stock App</h1>
                    <p className="lead">
                        This is a web-based stock portfolio app.
                    </p>
                    {
                        !auth.loading && (<Fragment>
                            {
                                auth.isAuthenticated ? authLinks : guestLinks
                            }
                        </Fragment>)
                    }
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
