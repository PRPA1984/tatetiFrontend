import React from "react"
import GlobalContent from "../common/components/GlobalContent"
import { useSessionUser } from "../store/userStore"


export function Profile() {
    const user = useSessionUser()

    return(
        <GlobalContent>
            <table className="table">
            <tbody>
                <tr>
                    <th scope="row">Id: </th>
                    <td>{user?.id}</td>
                </tr>
                <tr>
                    <th scope="row">Name: </th>
                    <td>{user?.name}</td>
                </tr>
                <tr>
                    <th scope="row">Matchmaking: </th>
                    <td>{user?.matchmaking ? "In queue" : "Not in queue"}</td>
                </tr>
            </tbody>
            </table>
        </GlobalContent>
    )
}