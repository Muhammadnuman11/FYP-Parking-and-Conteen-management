import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth, firestore } from '../../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';

const initialState = {
    email: "",
    password: "",
}

export default function Register() {

    const { dispatch } = useContext(AuthContext)

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleRegister = e => {
        e.preventDefault()
        let { email, password } = state

        setIsProcessing(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                addDocument(user)
                console.log("user created")
            })
            .catch((err) => {
                console.error(err)
                setIsProcessing(false)
            })
            setState(initialState)
    }

    const addDocument = async (user) => {
        try {
            await setDoc(doc(firestore, "users", user.uid), {
                uid: user.uid,
            });
            console.log("user documents created at firestore")
            dispatch({type: "LOGIN"})
        }
        catch (err) {
            console.error(err)
        }
        setIsProcessing(false)
        
    }

    return (
        <div className="auth">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card p-2 p-md-3 p-lg-4">
                            <div className="row">
                                <div className="col">
                                    <h1 className='text-center text-white'>REGISTER</h1>
                                </div>
                            </div>
                            <form onSubmit={handleRegister}>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label className='text-light fs-5' htmlFor="email">Email</label>
                                        <input type="email" className='w-100 emailStyle d-block' placeholder='Enter Your Email' name='email' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label className='text-light fs-5' htmlFor="password">Password</label>
                                        <input type="password" className='w-100 emailStyle' placeholder='Password' name='password' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button className='btn btn-danger text-light w-100 my-4' disabled={isProcessing}>
                                            {
                                                !isProcessing
                                                    ? "Register"
                                                    : <div className='spinner-grow spinner-grow-sm'></div>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col">
                                    <p className='text-center text-white'>Already have an account? <Link to="/auth/login" className='text-info mx-2'>Login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

