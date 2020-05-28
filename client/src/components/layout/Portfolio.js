import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouteMatch } from "react-router-dom";
import Stock from './Stock';
import Operation from './Operation';


const Portfolio = (props, { match }) => {
    const { auth } = props;
    let { path, url } = useRouteMatch();

    return (
        <Fragment>
            {
                (auth.user) ?
                    <div className='portfolio_container'>
                        <Stock />
                        <Operation url={url} path={path} />
                    </div>
                    :
                    <p>Loading...</p>
            }
        </Fragment>
    )
}

Portfolio.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Portfolio)

