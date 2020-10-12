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
            <div className='operations-nav-buttons'>
                <Link to={`${url}`} className={`operation-nav-tag buy-tag`} onClick={handleBuy}>Buy</Link>
                <Link to={`${url}/sell`} className={`operation-nav-tag`} onClick={handleSell}>Sell</Link>
                <Link to={`${url}/collapse`} className={`operation-nav-tag`} onClick={handleCollapse}>Collapse</Link>
            </div>
        )
    }
    else if (sell) {
        return (
            <div className='operations-nav-buttons'>
                <Link to={`${url}`} className={"operation-nav-tag"} onClick={handleBuy}>Buy</Link>
                <Link to={`${url}/sell`} className={`operation-nav-tag sell-tag`} onClick={handleSell}>Sell</Link>
                <Link to={`${url}/collapse`} className={`operation-nav-tag`} onClick={handleCollapse}>Collapse</Link>
            </div>
        )
    }
    else if (collapse) {
        return (
            <div className='operations-nav-buttons'>
                <Link to={`${url}`} className={"operation-nav-tag"} onClick={handleBuy}>Buy</Link>
                <Link to={`${url}/sell`} className={"operation-nav-tag"} onClick={handleSell}>Sell</Link>
                <Link to={`${url}/collapse`} className={`operation-nav-tag buy-tag`} onClick={handleCollapse}>Collapse</Link>
            </div>
        )
    }
}

export default NavbarSub;