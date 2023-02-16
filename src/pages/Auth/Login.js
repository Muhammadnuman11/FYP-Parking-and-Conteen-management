import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
    email: "",
    password: "",
}

export default function Login() {

    const navigate = useNavigate()
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleLogin = e => {
        e.preventDefault()
        let { email, password } = state

        setIsProcessing(true)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let user = userCredential.user
            navigate("/dashboard")
            console.log(user)
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            setIsProcessing(false)
        })
    }

    return (
        <div className="auth">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card p-2 p-md-3 p-lg-4">
                            <div className="row">
                                <div className="col">
                                    <h1 className='text-center text-white'>LOGIN</h1>
                                </div>
                            </div>
                            <form onSubmit={handleLogin}>
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
                                                    ? "Login"
                                                    : <div className='spinner-grow spinner-grow-sm'></div>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                                <div className="row">
                                    <div className="col">
                                        <p className='text-center text-white'>Need an account? <Link to="/auth/register" className='text-info mx-2'>Register</Link></p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
