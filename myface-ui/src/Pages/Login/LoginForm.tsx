import React, {FormEvent, useContext, useState} from 'react';
import {Page} from "../Page/Page";
import {LoginContext} from "../../Components/LoginManager/LoginManager";
import "./Login.scss";
import {loginRequest} from "../../Api/apiClient";
import {Feed} from "../Feed/Feed";

    export function LoginForm(): JSX.Element {
        const [authHeader, setAuthHeader] = useState("FALSE");
        const [dateStamp, setDateStamp] = useState(0);
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const loginContext = useContext(LoginContext);
        
        function tryLogin(event: FormEvent) {
            event.preventDefault();
            loginRequest({username, password})
                .then(() => loginContext.logIn())
                .then(() => setAuthHeader(loginContext.authHeader))
                .catch(() => setAuthHeader("DENIED"));
            return (<Feed/>)
        }
    return (
        <Page containerClassName="login">
            <h1 className="title">Login</h1>
            <form className="login-form" onSubmit={tryLogin}>
                <label className="form-label">
                    Username
                    <input className="form-input" type={"text"} value={username} onChange={event => setUsername(event.target.value)}/>
                </label>

                <label className="form-label">
                    Password
                    <input className="form-input" type={"password"} value={password} onChange={event => setPassword(event.target.value)}/>
                </label>
                <button className="submit-button" type="submit" onClick={() => setDateStamp(Date.now)}>Log In</button>
            </form>
        </Page>
    );
}