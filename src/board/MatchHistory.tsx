/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react"
import { matchHistory } from "./boardService"
import logo from "../assets/loading.gif"
import { ErrorHandler, useErrorHandler } from "../common/utils/ErrorHandler"
import DangerLabel from "../common/components/DangerLabel"


export function MatchHistory() {
    const errorHandler : ErrorHandler = useErrorHandler()
    const [matchList,setMatchList] = useState([])


    useEffect(() => {
        void loadMatchHistory()
    }, [])

    const loadMatchHistory = async () => {
        try {
            setMatchList(await matchHistory())
        }
        catch(error){
            errorHandler.processRestValidations(error)
        }
    }


    if (errorHandler.errorMessage) {
        return <DangerLabel message = {errorHandler.errorMessage}/>
    }
    else if(matchList === []) {
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
                    {matchList.map((match:any) => {
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