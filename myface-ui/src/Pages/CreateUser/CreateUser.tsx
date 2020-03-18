import React, {FormEvent, useState} from "react";
import {Page} from "../Page/Page";
import {createUser} from "../../Api/apiClient";
import {Link} from "react-router-dom";
import "./CreateUser.scss";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED"

export function CreateUserForm(): JSX.Element {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [status, setStatus] = useState<FormStatus>("READY");

    function submitForm(event: FormEvent) {
        event.preventDefault();
        setStatus("SUBMITTING");
        createUser({firstName, lastName, username, password, email, profileImageUrl, coverImageUrl})
            .then(() => setStatus("FINISHED"))
            .catch(() => setStatus("ERROR"));
    }

    if (status === "FINISHED") {
        return <div>
            <p>Form Submitted Successfully!</p>
            <Link to="/">Return to your feed?</Link>
        </div>
    }

    return (
        <form className="create-user-form" onSubmit={submitForm}>
            <label className="form-label">
                First Name
                <input className="form-input" value={firstName} onChange={event => setFirstName(event.target.value)}/>
            </label>

            <label className="form-label">
                Last Name
                <input className="form-input" value={lastName} onChange={event => setLastName(event.target.value)}/>
            </label>

            <label className="form-label">
                Choose a Username
                <input className="form-input" value={username} onChange={event => setUsername(event.target.value)}/>
            </label>

            <label className="form-label">
                Choose a Password
                <input className="form-input" value={password} onChange={event => setPassword(event.target.value)}/>
            </label>

            <label className="form-label">
                Email Address
                <input className="form-input" value={email} onChange={event => setEmail(event.target.value)}/>
            </label>

            <label className="form-label">
                Profile Image Url
                <input className="form-input" value={profileImageUrl} onChange={event => setProfileImageUrl(event.target.value)}/>
            </label>

            <label className="form-label">
                Cover Image Url
                <input className="form-input" value={coverImageUrl} onChange={event => setCoverImageUrl(event.target.value)}/>
            </label>
            
            <button className="submit-button" disabled={status === "SUBMITTING"} type="submit">Create User</button>
            {status === "ERROR" && <p>Something went wrong! Please try again.</p>}
        </form>
    );
}

export function CreateUser(): JSX.Element {
    return (
        <Page containerClassName="create-user-page">
            <h1 className="title">Create User</h1>
            <CreateUserForm/>
        </Page>
    );
}