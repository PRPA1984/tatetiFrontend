
import React from 'react'
import { useSessionUser } from './../store/userStore'
import { ButtonFindGame } from './ButtonFindGame'
import { InQueue } from './InQueue'
import "./Board.css"

export function FindGame() {
    const user = useSessionUser()
    const element = user?.matchmaking ? <InQueue/> : <ButtonFindGame/>
    return (
    <div className = "find-game">
        {element}
    </div>
    )
}