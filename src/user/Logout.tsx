import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { goHome } from "../common/utils/Tools"
import { logout } from "./userService"


export function Logout(props : RouteComponentProps) {

    void logout()

    return <h1>Logged out succesfully</h1>
}