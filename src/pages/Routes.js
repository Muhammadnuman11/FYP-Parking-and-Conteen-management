import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'

// Pages
import Frontend from "../pages/Frontend"
import Auth from "../pages/Auth"
import Dashboard from "../pages/Dashboard"
import PrivateRoute from '../components/PrivateRoute'
import UserProfile from './User/UserProfile'

export default function Index() {
  const { authentication } = useContext(AuthContext);
  const isAuthenticated = authentication.isAuthentication;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='auth/*' element={!isAuthenticated ? <Auth /> : <Navigate to="/user/userprofile" />} />
        <Route path='dashboard/*' element={<Dashboard />} />
        <Route path='user/userprofile' element={<PrivateRoute Component={UserProfile} />} />
      </Routes>
    </BrowserRouter>
  )
}
