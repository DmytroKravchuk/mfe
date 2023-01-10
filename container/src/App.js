import React, { lazy, Suspense, useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { createMemoryHistory, createBrowserHistory } from 'react-router-dom/node_modules/history';

import Header from "./components/header/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import('./components/MarketingApp.js'));
const AuthLazy = lazy(() => import('./components/AuthApp.js'));
const DashboardLazy = lazy(() => import('./components/DashboardApp.js'));

const generateClassName = createGenerateClassName( {
    productionPrefix: 'co'
} );

const history = createBrowserHistory();

export default () => {
    const [isSignIn, setIsSignIn] = useState(false);

    useEffect(() => {
        if (isSignIn) {
            history.push('/dashboard');
        }
    }, [isSignIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignIn} onSignOut={() => setIsSignIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthLazy onSignIn={() => setIsSignIn(true)}/>
                            </Route>
                            <Route path="/dashboard">
                                {!isSignIn ? <Redirect to="/" /> : <DashboardLazy />}
                            </Route>
                            <Route path='/' component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>)
}
