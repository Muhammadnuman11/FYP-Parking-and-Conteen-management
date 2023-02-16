import React, { useReducer, createContext, useEffect } from 'react'
import { auth } from '../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

const initialState = { isAuthentication: false }

const reducer = ((state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { isAuthentication: true, user: action.payload.users }
        case "LOGOUT":
            return { isAuthentication: false }
        default:
            return state
    }

})

export default function AuthContextProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        onAuthStateChanged(auth, (users) => {
            if (users) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                // console.log(user)
                console.log("User is signed in")
                dispatch({ type: "LOGIN", payload: { users } })
            } else {
                console.log("User is signed out")
            }
        });
    }, [])


    return (
        <AuthContext.Provider value={{ authentication: state, users: state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}
