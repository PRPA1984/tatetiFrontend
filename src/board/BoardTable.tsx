/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { useErrorHandler } from '../common/utils/ErrorHandler'
import { useSessionBoard } from './../store/boardStore'
import { useSessionUser } from './../store/userStore'
import { Board } from './boardModel'

export function BoardTable() {
    const board = useSessionBoard
    const user = useSessionUser

    debugger

    const auxBoard = board.board.map(function (x:string | undefined){
        return x === undefined ? "transparent" : x
    })

    return (
		<table>
            <thead>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <BoardRow id="1" player={auxBoard[1]}/>
                    <BoardRow id="2" player={auxBoard[2]}/>
                    <BoardRow id="3" player={auxBoard[3]}/>
                </tr>
                <tr>
                    <BoardRow id="4" player={auxBoard[4]}/>
                    <BoardRow id="5" player={auxBoard[5]}/>
                    <BoardRow id="6" player={auxBoard[6]}/>
                </tr>
                <tr>
                    <BoardRow id="7" player={auxBoard[7]}/>
                    <BoardRow id="8" player={auxBoard[8]}/>
                    <BoardRow id="9" player={auxBoard[9]}/>
                </tr>
            </tbody>
        </table>
    )
}

function BoardRow(props: {id: string, player: string}) {
    const board  = useSessionBoard as unknown as Board
    const errorHandler = useErrorHandler

    const color = props.player !== "transparent" ? (props.player === board.greenPlayer ? "green" : "red"): "transparent"
    function handleClick(id:string) {
/*         try {
            await newMovement(id)
        } catch (error) {
            errorHandler.processRestValidations(error)
        } */
    }
    return(
        <td id={props.id}
        onClick={void handleClick(props.id)}
        color = {color}></td>
    )
}