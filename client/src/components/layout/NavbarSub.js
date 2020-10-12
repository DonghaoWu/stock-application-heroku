import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarSub = props => {
    const { url } = props;

    const [clickData, setClickData] = useState({
        buy: true,
        sell: false,
        collapse: false
    });

    const handleBuy = () => {
        setClickData({
            ...clickData, buy: true, sell: false, collapse: false
        })
    }

    const handleSell = () => {
        setClickData({
            ...clickData, buy: false, sell: true, collapse: false
        })
    }

    const handleCollapse = () => {
        setClickData({
            ...clickData, buy: false, sell: false, collapse: true
        })
    }

    const { buy, sell, collapse } = clickData;
    if (buy) {
        return (
            <div>
                <Link to={`${url}`} className={`buy_tag`} onClick={handleBuy}>Buy</Link>
                <Link to={`${url}/sell`} className={`disable_tag sell`} onClick={handleSell}>Sell</Link>
                <Link to={`${url}/collapse`} className={`disable_tag`} onClick={handleCollapse}>Collapse</Link>
            </div>
        )
    }
    else if (sell) {
        return (
            <div>
                <Link to={`${url}`} className={"disable_tag buy"} onClick={handleBuy}>Buy</Link>
                <Link to={`${url}/sell`} className={`sell_tag`} onClick={handleSell}>Sell</Link>
                <Link to={`${url}/collapse`} className={`disable_tag`} onClick={handleCollapse}>Collapse</Link>
            </div>
        )
    }
    else if (collapse) {
        return (
            <div>
                <Link to={`${url}`} className={"disable_tag buy"} onClick={handleBuy}>Buy</Link>
                <Link to={`${url}/sell`} className={"disable_tag buy"} onClick={handleSell}>Sell</Link>
                <Link to={`${url}/collapse`} className={`disable_tag`} onClick={handleCollapse}>Collapse</Link>
            </div>
        )
    }
}

export default NavbarSub;