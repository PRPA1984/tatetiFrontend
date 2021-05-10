/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-key */
import React, { useEffect } from "react"
import { useSessionUser } from "../store/userStore"
import { matchHistory } from "./boardService"
import { User } from "../user/userModel"
import logo from "../assets/loading.gif"
import { cleanupSessionMatch, useSessionMatch } from "../store/matchHistory"
import { ErrorHandler, useErrorHandler } from "../common/utils/ErrorHandler"
import DangerLabel from "../common/components/DangerLabel"


export function MatchHistory() {
    const user = useSessionUser() as User
    const errorHandler : ErrorHandler = useErrorHandler()
    const matchList = useSessionMatch() as unknown as any[]

    useEffect(() => {
        void loadMatchHistory()
        return () => {
            cleanupSessionMatch()
        }
    }, [])

    const loadMatchHistory = async () => {
        try {
            await matchHistory(user)
        }
        catch(error){
            errorHandler.processRestValidations(error)
        }
    }


    if (errorHandler.errorMessage) {
        return <DangerLabel message = {errorHandler.errorMessage}/>
    }
    else if(matchList === undefined) {
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