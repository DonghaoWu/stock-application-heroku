import React, { Fragment } from 'react';
// import Buy from './Buy';
import Buy1 from './Buy1';
import Sell1 from './Sell1';
import NavbarSub from './NavbarSub';
import { Switch, Route } from "react-router-dom";


const Operation = props => {
    const { url, path } = props;

    return (
        <Fragment>
            <NavbarSub url={url} />
            <Switch>
                <Route exact path={`${path}/sell`} component={Sell1} />
                <Route exact path={`${path}`} component={Buy1} />
            </Switch>
        </Fragment>
    )
}

export default Operation;
