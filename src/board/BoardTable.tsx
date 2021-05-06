import React from 'react'
import { useErrorHandler } from '../common/utils/ErrorHandler'
import { useSessionBoard } from './../store/boardStore'
import { useSessionUser } from './../store/userStore'
import { Board } from './boardModel'

export function BoardTable() {
    const board = useSessionBoard
    const user = useSessionUser

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
                    <BoardRow id="1" player={board.board[1]}/>
                    <BoardRow id="2" player={board.board[2]}/>
                    <BoardRow id="3" player={board.board[3]}/>
                </tr>
                <tr>
                    <BoardRow id="4" player={board.board[4]}/>
                    <BoardRow id="5" player={board.board[5]}/>
                    <BoardRow id="6" player={board.board[6]}/>
                </tr>
                <tr>
                    <BoardRow id="7" player={board.board[7]}/>
                    <BoardRow id="8" player={board.board[8]}/>
                    <BoardRow id="9" player={board.board[9]}/>
                </tr>
            </tbody>
        </table>
    )
}

function BoardRow(props: {id: string, player: string}) {
    const board  = useSessionBoard
    const errorHandler = useErrorHandler

    const color = props.player ? (props.player === board.greenPlayer ? "green" : "red"): "transparent"
    function handleClick(id:string) {
        try {
            await newMovement(id)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }
    return(
        <td id={props.id}
        onClick={void handleClick(props.id)}
        color = {color}></td>
    )
}