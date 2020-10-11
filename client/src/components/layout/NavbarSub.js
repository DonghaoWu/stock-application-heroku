import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarSub = props => {
    const { url } = props;

    const [clickData, setClickData] = useState({
        action: 'buy'
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

    const Default = () => {
        return (
            <div>
                <Link to={`${url}`} className={`buy_tag`} onClick={handleBuy}>Buy</Link>
                <Link to={`${url}/sell`} className={`disable_tag sell`} onClick={handleSell}>Sell</Link>
                <Link to={`${url}/collapse`} className={`disable_tag`} onClick={handleCollapse}>Collapse</Link>
            </div >
        )
    };

    const SellEnable = (
        <Fragment>
            <Link to={`${url}`} className={"disable_tag buy"} onClick={handleBuy}>Buy</Link>
            <Link to={`${url}/sell`} className={`sell_tag`} onClick={handleSell}>Sell</Link>
            <Link to={`${url}/collapse`} className={`disable_tag`} onClick={handleCollapse}>Collapse</Link>
        </Fragment>
    );

    const CollapseEnable = (
        <Fragment>
            <Link to={`${url}`} className={"disable_tag buy"} onClick={handleBuy}>Buy</Link>
            <Link to={`${url}/sell`} className={`disable_tag sell`} onClick={handleSell}>Sell</Link>
            <Link to={`${url}/collapse`} className={`normal_tag`} onClick={handleCollapse}>Collapse</Link>
        </Fragment>
    );

    return (
        <Fragment>
            {
                (action === 'buy') ?
                    Default :
                    (action === 'sell') ?
                        SellEnable :
                        CollapseEnable
            }
        </Fragment>
    )
}

export default NavbarSub;