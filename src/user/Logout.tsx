import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { goHome } from "../common/utils/Tools"
import { logout } from "./userService"


export function Logout(props : RouteComponentProps) {

    void logout()

    void goHome(props)

    return null
}