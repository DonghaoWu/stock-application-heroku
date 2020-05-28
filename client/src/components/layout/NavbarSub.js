import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useRouteMatch } from "react-router-dom";


const NavbarSub = props => {
    const { url } = props;

    const [clickData, setClickData] = useState({
        action: 'collapse'
    });

    const { action } = clickData;

    const handleBuy = () => {
        setClickData({
            ...clickData, action: 'buy'
        })
    }

    const handleSell = () => {
        setClickData({
            ...clickData, action: 'sell'
        })
    }

    const handleCollapse = () => {
        setClickData({
            ...clickData, action: 'collapse'
        })
    }

    const NoEnable = (
        <Fragment>
            <Link to={`${url}/buy`} className={`disable_tag`} onClick={handleBuy}>Buy</Link>
            <Link to={`${url}/sell`} className={`disable_tag`} onClick={handleSell}>Sell</Link>
            <Link to={`${url}`} className={`normal_tag`} onClick={handleCollapse}>Collapse</Link>
        </Fragment>
    );
    const BuyEnable = (
        <Fragment>
            <Link to={`${url}/buy`} className={`buy_tag`} onClick={handleBuy}>Buy</Link>
            <Link to={`${url}/sell`} className={`disable_tag`} onClick={handleSell}>Sell</Link>
            <Link to={`${url}`} className={`normal_tag`} onClick={handleCollapse}>Collapse</Link>
        </Fragment>
    );
    const SellEnable = (
        <Fragment>
            <Link to={`${url}/buy`} className={`disable_tag`} onClick={handleBuy}>Buy</Link>
            <Link to={`${url}/sell`} className={`sell_tag`} onClick={handleSell}>Sell</Link>
            <Link to={`${url}`} className={`normal_tag`} onClick={handleCollapse}>Collapse</Link>
        </Fragment>
    );

    return (
        <Fragment>
            {
                (action === 'collapse') ?
                    NoEnable :
                    (action === 'buy') ?
                        BuyEnable :
                        SellEnable
            }
        </Fragment>
    )
}

export default NavbarSub;