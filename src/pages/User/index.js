import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import GetUser from './GetUser'
import UserProfile from './UserProfile'

export default function index() {
    return (
        <>
                <Routes path='/*'>
                    <Route path="/userprofile" element={<UserProfile />} />
                    {/* <Route path="/getuser" element={<GetUser />} /> */}
                </Routes>
        </>
    )
}
