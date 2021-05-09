
import React from 'react'
import GlobalContent from '../common/components/GlobalContent'
import { useSessionUser } from './../store/userStore'
import { ButtonFindGame } from './ButtonFindGame'
import { InQueue } from './InQueue'

export function FindGame() {
    const user = useSessionUser()
    const element = user?.matchmaking ? <InQueue/> : <ButtonFindGame/>
    return (
    <div style = {{position: "fixed", top: "40%",left: "45%"}}>
        {element}
    </div>
    )
}