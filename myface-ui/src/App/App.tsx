import React, {ReactElement, useContext} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Feed} from "../Pages/Feed/Feed";
import {Users} from "../Pages/Users/Users";
import {NotFound} from "../Pages/NotFound/NotFound";
import {LoginForm} from "../Pages/Login/LoginForm";
import {LoginContext, LoginManager} from "../Components/LoginManager/LoginManager";
import {Profile} from "../Pages/Profile/Profile";
import {CreatePost} from "../Pages/CreatePost/CreatePost";
import {CreateUser} from "../Pages/CreateUser/CreateUser";


function Routes(): ReactElement {
    const loginContext = useContext(LoginContext);
    const authHeader = loginContext.authHeader;
    
    
    
    // if (!loginContext.authHeader) {
    //     return <LoginForm/>
    // }
    
    return (
        
        <Switch>
            <Route exact path="/" component={Feed}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/users/:id" component={Profile}/>
            <Route exact path="/new-user" component={CreateUser}/>
            <Route exact path="/new-post" component={CreatePost}/>
            <Route exact path="/login" component={LoginForm}/>
            <Route path="" component={NotFound}/>
        </Switch>
    );
}

export default function App(): ReactElement {
    return (
        <Router>
            <LoginManager>
                <Routes/>
            </LoginManager>
        </Router>
    );
}
