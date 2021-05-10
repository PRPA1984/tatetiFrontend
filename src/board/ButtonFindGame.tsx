import React from "react"
import { newGame } from "./boardService"
import { useSessionUser } from './../store/userStore'
import { ErrorHandler, useErrorHandler } from './../common/utils/ErrorHandler'
import { useForceUpdate } from "../common/utils/Tools"


export function ButtonFindGame(props: {label?:string}){

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
        {props.label ? props.label : "Find Game"}
    </button>
    )
}