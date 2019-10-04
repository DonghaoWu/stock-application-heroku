import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'

const Landing = props => {
    const { logout, auth ,state} = props;
    console.log(state);
    const authLinks = (
        <div className="buttons">
            <a onClick={logout} className="btn btn-danger" href='/'>Logout</a>
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
            <div className="dark-overlay">
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
    state:state,
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Landing);
