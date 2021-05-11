import React from "react"
import { HashRouter, Route } from "react-router-dom"
import Login from "../user/Login"
import LoggedInRoute from "../common/components/LoggedInRoute"
import Register from "../user/Register"
import Welcome from "../welcome/Welcome"
import Toolbar from "./Toolbar"
import "./App.css"
import { Game } from "../board/Game"
import { MatchHistory } from "../board/MatchHistory"
import { Logout } from "../user/Logout"
import { Profile } from "../user/Profile"

export default function App() {
  return (
    <HashRouter>
      <table className = "app_table">
        <thead>
          <tr className="app_toolbar">
            <td>
              <Toolbar />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="app_content">
              <Route exact path="/" component={Welcome} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <LoggedInRoute path="/game" component={Game}/>
              <LoggedInRoute path="/matchHistory" component={MatchHistory}/>
              <LoggedInRoute path="/logout" component={Logout}/>
              <LoggedInRoute path="/profile" component={Profile}/>
            </td>
          </tr>
        </tbody>
      </table>
    </HashRouter >
  )
}
