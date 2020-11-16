import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";

const Inventory = props => {
    const authContext = useContext(AuthContext);

    return (
        <div style={{ margin: "0 auto" }}>
            {console.log(authContext.user._doc)}
            <h1>Dear {authContext.user._doc.username}</h1>
            <br />
            <button type="button" onClick={() => { window.location.href = "/" }} >Return</button>
        </div>
    );
}

export default Inventory;