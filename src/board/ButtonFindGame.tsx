import React from "react"
import { newGame } from "../user/playerService"
import { useSessionUser } from './../store/userStore'
import { ErrorHandler, useErrorHandler } from './../common/utils/ErrorHandler'


export function ButtonFindGame(){

    const user = useSessionUser()

    const errorHandler = useErrorHandler()

    async function handleClick() {
        try {
            await newGame()
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    return(
    <button type="button" className="btn btn-primary btn-lg" onClick = {handleClick}>
        Find Game
    </button>
    )
}