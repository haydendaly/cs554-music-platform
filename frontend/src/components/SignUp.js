import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions'
import { AuthContext } from '../firebase/Auth'
import SocialSignIn from './SocialSignIn'
function SignUp() {
    const { currentUser } = useContext(AuthContext)
    const [pwMatch, setPwMatch] = useState('')
    const handleSignUp = async (e) => {
        e.preventDefault()
        const {
            displayName,
            email,
            passwordOne,
            passwordTwo,
        } = e.target.elements
        if (passwordOne.value !== passwordTwo.value) {
            setPwMatch('Passwords do not match')
            return false
        }

        try {
            await doCreateUserWithEmailAndPassword(
                email.value,
                passwordOne.value,
                displayName.value
            )
        } catch (error) {
            alert(error)
        }
    }

    if (currentUser) {
        return <Redirect to="/home" />
    }

    return (
        <div className="main">
            <div className="container authorize">
                <h1>Sign Up</h1>
                {pwMatch && <h4 className="error">{pwMatch}</h4>}
                <form onSubmit={handleSignUp}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                required
                                name="displayName"
                                type="text"
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                required
                                name="email"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                id="passwordOne"
                                name="passwordOne"
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                            Confirm Password
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                name="passwordTwo"
                                type="password"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                    </div>
                    <div className="submit-button">
                        <button
                            className="btn btn-light"
                            id="submitButton"
                            name="submitButton"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <br />
                <SocialSignIn />
            </div>
        </div>
    )
}

export default SignUp
