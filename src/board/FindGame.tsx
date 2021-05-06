
import React from 'react'
import GlobalContent from '../common/components/GlobalContent'
import { useSessionUser } from './../store/userStore'
import { ButtonFindGame } from './ButtonFindGame'
import { InQueue } from './InQueue'

export function FindGame() {
    const user = useSessionUser()
    const element = user?.state ? <InQueue/> : <ButtonFindGame/>
    return (
    <div>
        {element}
    </div>
    )
}