import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


const NavbarSub = props => {
    const { url } = props;
    return (
        <Fragment>
            <Link to={`${url}`} className={`buy_tag`}>Buy</Link>
            <Link to={`${url}/sell`} className={`sell_tag`}>Sell</Link>
        </Fragment>
    )
}

export default NavbarSub;