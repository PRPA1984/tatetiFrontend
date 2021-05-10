
import { useSessionBoard } from './../store/boardStore'
import React from 'react'
import GlobalContent from '../common/components/GlobalContent'
import { FindGame } from './FindGame'
import { BoardTable } from './BoardTable'

export function Game () {
    const board = useSessionBoard()

    const element = board ? <BoardTable /> : <FindGame/>
    return(
        <GlobalContent>
            {element}
        </GlobalContent>
    )
}