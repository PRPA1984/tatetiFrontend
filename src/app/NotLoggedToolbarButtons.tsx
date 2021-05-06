import React from "react"
import { NavLink } from "react-router-dom"



export function NotLoggedToolbarButtons() {

    return(
    <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
            <NavLink to="/login" className="nav-link">Login</NavLink>
        </li>
        <li className="nav-item active">
            <NavLink to="/register" className="nav-link">Register</NavLink>
        </li>
    </ul>

    )
}