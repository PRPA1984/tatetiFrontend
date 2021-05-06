import React from "react"



export function LoggedToolbarButtons() {

    return(
    <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
            <a className="nav-link" href="#">Play!<span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item active">
            <a className="nav-link" href="#">Match History<span className="sr-only">(current)</span></a>
        </li>
    </ul>

    )
}