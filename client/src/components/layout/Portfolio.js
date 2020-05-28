import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Operation from './Operation';
import { useRouteMatch } from "react-router-dom";
import Stock from './Stock';
import Operation from './Operation';


const Portfolio = (props, { match }) => {
    const { auth } = props;
    let { path, url } = useRouteMatch();

    return (
        <div>
            {
                (auth.user) ?
                    <Fragment>
                        <Stock />
                        <Operation url={url} path={path} />
                    </Fragment>
                    :
                    <p>Loading...</p>
            }
        </div>
    )
}

Portfolio.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Portfolio)

