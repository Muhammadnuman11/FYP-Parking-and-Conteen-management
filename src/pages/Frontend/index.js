import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Components
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Home from './Home'
import About from './About'

export default function Index() {
    return (
        <>
            {/* <Routes> */}
                <Header />
                <main>
                    <Routes path='/*'>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
                <Footer />
            {/* </Routes> */}
        </>
    )
}
