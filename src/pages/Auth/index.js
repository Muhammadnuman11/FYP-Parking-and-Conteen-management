import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './ForgotPassword'
import Login from './Login'
import Register from './Register'

export default function Index() {
    return (
        <Routes path="/">
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgotpassword' element={<ForgotPassword />} />
        </Routes>
    )
}

