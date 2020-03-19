import React, {FormEvent, useContext, useState} from 'react';
import {Page} from "../Page/Page";
import {LoginContext} from "../../Components/LoginManager/LoginManager";
import "./Login.scss";
import {createUser, fetchUserByUsername, loginRequest} from "../../Api/apiClient";
import {Interface} from "readline";


type FormStatus = "READY" | "SUBMITTING" | "DENIED" | "AUTHENTICATED"

const [authHeader, setAuthHeader] = useState("");
const loginContext = useContext(LoginContext);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

    function tryLogin(event: FormEvent) {
        const [status, setStatus] = useState<FormStatus>("READY");
        event.preventDefault();
        setStatus("SUBMITTING");
        loginRequest({username, password})
                // .then(() => setAuthHeader())
                .catch(() => setStatus("DENIED"));
            loginContext.logIn();
    }

    export function LoginForm(): JSX.Element {
 
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
                
                <button className="submit-button" type="submit">Log In</button>
            </form>
        </Page>
    );
}