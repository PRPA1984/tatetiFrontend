import React from "react"
import { HashRouter, Route } from "react-router-dom"
import Login from "../user/Login"
import LoggedInRoute from "../common/components/LoggedInRoute"
import Register from "../user/Register"
/* import Info from "../info/Info"
import Profile from "../profile/Profile"
import Password from "../user/Password"
 */
import Welcome from "../welcome/Welcome"
import Toolbar from "./Toolbar"
import "./App.css"
import { Game } from "../board/Game"
import { MatchHistory } from "../board/MatchHistory"
import { Logout } from "../user/Logout"

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
            <td id="content" className="app_content">
              <Route exact path="/" component={Welcome} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <LoggedInRoute path="/game" component={Game}/>
              <LoggedInRoute path="/matchHistory" component={MatchHistory}/>
              <LoggedInRoute path="/logout" component={Logout}/>
            </td>
          </tr>
        </tbody>
      </table>
    </HashRouter >
  )
}
