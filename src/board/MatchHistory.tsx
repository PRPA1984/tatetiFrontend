/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-key */
import React, { useEffect } from "react"
import { useSessionUser } from "../store/userStore"
import { matchHistory } from "../user/playerService"
import { User } from "../user/userModel"
import logo from "../assets/loading.gif"
import { useSessionMatch } from "../store/matchHistory"


export function MatchHistory() {
    const user = useSessionUser() as User
    const matchList = useSessionMatch() as unknown as any[]

    useEffect(() => {
        try {
            void matchHistory(user)
        } catch (error) {
            console.log("Error Match history")
        }
    }, [])
    if(matchList === undefined) {
        return <img src={logo} alt="loading..." style = {{position: "fixed", top: "40%",left: "45%"}}/>
    }
    else {
        return (
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">Green Player</th>
                    <th scope="col">Red Player</th>
                    <th scope="col">Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {matchList.map((match) => {
                            return (
                                <tr>
                                    <td>{match.id}</td>
                                    <td>{match.greenPlayer}</td>
                                    <td>{match.redPlayer}</td>
                                    <td>{match.winner}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        )
    }
}