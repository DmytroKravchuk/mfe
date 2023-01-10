import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import Header from "./components/header/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import('./components/MarketingApp.js'));
const AuthLazy = lazy(() => import('./components/AuthApp.js'));

const generateClassName = createGenerateClassName( {
    productionPrefix: 'co'
} );

export default () => {
    const [isSignIn, setIsSignIn] = useState(false);

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignIn} onSignOut={() => setIsSignIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthLazy onSignIn={() => setIsSignIn(true)}/>
                            </Route>
                            <Route path='/' component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>)
}
