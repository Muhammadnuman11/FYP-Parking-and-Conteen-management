import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../pages/Context/AuthContext";

export default function Navbar() {

    const { authentication, dispatch } = useContext(AuthContext)
    const { isAuthentication } = authentication
    console.log(isAuthentication)

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "LOGOUT" })
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-info navbar-info p-0">
                <div className="container">
                    <Link to="/" className="navbar-brand fs-2 fw-bold text-white">Car Parking</Link>
                    <button className="navbar-toggler shadow-none border-0 navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex w-100">
                            <ul className="navbar-nav d-flex justify-content-end me-auto w-100 mb-2 mb-lg-0">
                                <li className="nav-item mx-2">
                                    <Link to="/" className="nav-link text-white " aria-current="page">Home</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/about" className="nav-link text-white ">About</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/contact" className="nav-link text-white ">Contact</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/conteen" className="nav-link text-white ">Conteen</Link>
                                </li>

                                {!isAuthentication ?
                                    <>
                                        <li className="nav-item mx-2">
                                            <Link to="auth/login" className="nav-link text-white ">Login</Link>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <Link to="auth/register" className="nav-link text-white ">Register</Link>
                                        </li>
                                    </>
                                    : <>
                                        <li className="nav-item mx-2">
                                            <Link to="user/userprofile" className="nav-link text-white ">Profile</Link>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <Link to="" className="nav-link text-white " onClick={handleLogout}>Logout</Link>
                                        </li>
                                    </>
                                }

                                {/* <button className="btn btn-info btn-sm mx-2 text-light">
                                <Link to="auth/register" className="nav-link">Register</Link></button>
                            <button className="btn btn-info btn-sm mx-2 text-light">
                                <Link to="auth/forgotpassword" className="nav-link">Forgot Password</Link></button> */}

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}