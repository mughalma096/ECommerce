import React, { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import { CssBaseline, } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';

import { Navbar, Users, UserForm, Profile, TimeZoneForm, Footer } from './components';
import { NotFound, LoginForm, RegisterForm, Logout } from './components/Authentication';

import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const [user, setUser] = useState(null);
    const [reload, setReload] = useState(false);

    window.addEventListener('popstate', (event) => {
        window.location.href = event.currentTarget.location.href
    });

    useEffect(() => {
        if(user == null)
        {
            setUser(auth.getCurrentUser());
        }
    }, [user]);

    return (
        <Router>
            <div style={{ display: 'flex', marginBottom: 40 }}>
                <CssBaseline />
                <ToastContainer />
                <Navbar user={user}/>
                <Routes>
                    <Route path="/home" element={<Users user={user} reload={reload} setReload={setReload} />} />
                    <Route path="/profile/:id" element={<Profile reload={reload} setReload={setReload} />} />
                    <Route path='/user/:id' element={<UserForm reload={reload} setReload={setReload} />} />
                    <Route path="/register" element={<RegisterForm reload={reload} setReload={setReload} />} />
                    <Route path="/:user_id/add-timezone" element={<TimeZoneForm reload={reload} setReload={setReload} />} />
                    <Route path="/login" element={<LoginForm reload={reload} setReload={setReload} />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/not-found" element={<NotFound />} />
                    <Redirect from="/" exact to="/home" />
                    <Redirect to="/not-found" />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
