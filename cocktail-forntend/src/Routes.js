import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Cocktails from "./containers/Cocktails/Cocktails";


const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props} /> : <Redirect to={"/users/facebookLogin"}/>
);

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" exact component={Cocktails}/>
            {/*<ProtectedRoute isAllowed={user && user.role === 'admin'}*/}
            {/*                path="/admin" exact component={AdminPage}/>*/}

        </Switch>
    );
};

export default Routes;