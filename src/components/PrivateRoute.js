import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../pages/Context/AuthContext'

export default function PrivateRoute(props) {

    const { authentication } = useContext(AuthContext);
    const isAuthenticated = authentication.isAuthentication;

    const { Component } = props

    if (!isAuthenticated)
        return <Navigate to="/auth/login" />
    return (
        <Component />
    )

}