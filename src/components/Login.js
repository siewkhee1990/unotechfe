import React, { useState, useContext } from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import GoogleLoginButton from '../../components/authentication/googlelogin'
import AuthService from "../services/AuthServices";
import { AuthContext } from "../contexts/AuthContext";
import picture from "../stocks.png"

const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    const history = useHistory()

    const handleChange = e => {
        setUser({ ...user, [e.target.id]: e.target.value });
    }

    const handleLogout = e => {
        e.preventDefault();
        AuthService.logout().then(data => {
            if (data.success) {
                authContext.setUser(data.user);
                authContext.setIsAuthenticated(false);
                localStorage.removeItem('access_token');
                history.push('/')
            }
        })
    }

    const login = e => {
        e.preventDefault();
        AuthService.login(user)
            .then(data => {
                const { isAuthenticated, user, message } = data;
                if (isAuthenticated) {
                    authContext.setUser(user);
                    authContext.setIsAuthenticated(isAuthenticated);
                    history.push('/');
                    handleUser(user);

                }
                else
                    alert(data.message);
            }).catch((err) => {
                setMessage(err.message)
            })
    }

    const handleUser = event => {
        props.setUser(event);
    }

    const toLogin = () => {
        return (
            <>
                <h3>Please Login Below</h3>
                <form onSubmit={login}>
                    <label>Username: </label>
                    <input type="text" id="username" onChange={handleChange} />
                    <br />
                    <br />
                    <label>Password: </label>
                    <input type="password" id="password" onChange={handleChange} />
                    <br />
                    <br />
                    <input type="submit" value="Login" />
                </form>
            </>
        )
    }

    const goToInven = () => {
        return (
            <>
                <button type="button" onClick={() => { window.location.href = "/inventory" }}>Go to inventory</button>
                <br />
                <button type="button" onClick={handleLogout} >Logout</button>
            </>
        )
    }

    return (
        <div style={{ margin: "0 auto" }}>
            <img src={picture}></img>
            <br />
            {authContext.isAuthenticated ? goToInven() : toLogin()}
        </div>
    );
}

export default Login;