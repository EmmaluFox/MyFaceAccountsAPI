import React, {createContext, ReactNode, useState} from "react";
import {LoginForm} from "../../Pages/Login/LoginForm";

export const LoginContext = createContext({
    isLoggedIn: false,
    isAdmin: false,
    authHeader: "",
    logIn: () => {},
    logOut: () => {},
});

interface LoginManagerProps {
    children: ReactNode
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
    const [loggedIn, setLoggedIn] = useState(false);
    const [authHeader, setAuthHeader] = useState("");
    
    function logIn() {
        setLoggedIn(true);
    }
    
    function logOut() {
        setLoggedIn(false);
        setAuthHeader("DENIED");
        return (
            <LoginForm/>
        )
    }
    
    const context = {
        isLoggedIn: loggedIn,
        isAdmin: loggedIn,
        authHeader: authHeader,
        logIn: logIn,
        logOut: logOut,
    };
    
    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}