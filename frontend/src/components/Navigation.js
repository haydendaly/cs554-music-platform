import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../firebase/Auth'
import SignOutButton from './SignOut'

const Navigation = () => {
    const { currentUser } = useContext(AuthContext)
    return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
}

const NavigationAuth = () => {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </nav>
    )
}

const NavigationNonAuth = () => {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <NavLink exact to="/signup" activeClassName="active">
                        Sign Up
                    </NavLink>
                </li>

                <li>
                    <NavLink exact to="/signin" activeClassName="active">
                        Sign In
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
