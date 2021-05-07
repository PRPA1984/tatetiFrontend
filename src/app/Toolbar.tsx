import React from "react"
import { NavLink } from "react-router-dom"
import { useSessionUser } from "../store/userStore"
import { LoggedToolbarButtons } from "./LoggedToolbarButtons"
import { NotLoggedToolbarButtons } from "./NotLoggedToolbarButtons"

export default function Toolbar() {
  const user = useSessionUser()

  const buttons = user ? <LoggedToolbarButtons /> : <NotLoggedToolbarButtons />

  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink to="/" className="navbar-brand">Tateti</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {buttons}
    </div>
    <h3>{user ? user.name : ""}</h3>
  </nav>
  )
}
