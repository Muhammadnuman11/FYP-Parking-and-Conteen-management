import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './Home'
import Users from './Users'

export default function index() {
  return (
    <Routes>
        <Route path='/'>
            <Route index element={<Home />} />
            <Route path='users' element={<Users />} />
        </Route>
    </Routes>
  )
}
