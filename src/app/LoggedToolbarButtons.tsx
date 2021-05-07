import React from "react"
import { NavLink } from "react-router-dom"



export function LoggedToolbarButtons() {

    return(
    <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
            <NavLink to="/game" className="nav-link">Play!</NavLink>
        </li>
        <li className="nav-item active">
            <NavLink to="/matchHistory" className="nav-link">Match History</NavLink>
        </li>
    </ul>

    )
}