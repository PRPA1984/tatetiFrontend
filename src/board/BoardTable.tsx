/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import FormTitle from '../common/components/FormTitle'
import { useErrorHandler } from '../common/utils/ErrorHandler'
import { newMovement } from '../user/playerService'
import { useSessionBoard } from './../store/boardStore'
import { useSessionUser } from './../store/userStore'
import { Board } from './boardModel'

export function BoardTable() {
    const board = useSessionBoard as any
    const user = useSessionUser as any

    const team:string= board.greenPlayer === user.name ? "green" : "red"
    const enemyPlayer:string = team === "green" ? board.redPlayer : board.greenPlayer
    if (board.board) {
        return (
        <div>
            <FormTitle>{team === board.turn ? "Your Turn" : enemyPlayer + "'s Turn"}</FormTitle>
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
                        <BoardRow id="1" player={board.board[1] ?  board.board[1] : undefined}/>
                        <BoardRow id="2" player={board.board[2] ?  board.board[2] : undefined}/>
                        <BoardRow id="3" player={board.board[3] ?  board.board[3] : undefined}/>
                    </tr>
                    <tr>
                        <BoardRow id="4" player={board.board[4] ?  board.board[4] : undefined}/>
                        <BoardRow id="5" player={board.board[5] ?  board.board[5] : undefined}/>
                        <BoardRow id="6" player={board.board[6] ?  board.board[6] : undefined}/>
                    </tr>
                    <tr>
                        <BoardRow id="7" player={board.board[7] ?  board.board[7] : undefined}/>
                        <BoardRow id="8" player={board.board[8] ?  board.board[8] : undefined}/>
                        <BoardRow id="9" player={board.board[9] ?  board.board[9] : undefined}/>
                    </tr>
                </tbody>
            </table>
        </div>
        )
    } else {
        return (
        <div>
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
                        <BoardRow id="1" player={undefined}/>
                        <BoardRow id="2" player={undefined}/>
                        <BoardRow id="3" player={undefined}/>
                    </tr>
                    <tr>
                        <BoardRow id="4" player={undefined}/>
                        <BoardRow id="5" player={undefined}/>
                        <BoardRow id="6" player={undefined}/>
                    </tr>
                    <tr>
                        <BoardRow id="7" player={undefined}/>
                        <BoardRow id="8" player={undefined}/>
                        <BoardRow id="9" player={undefined}/>
                    </tr>
                </tbody>
            </table>
        </div>
        )
    }
}

function BoardRow(props: {id: string, player: string | undefined}) {
    const board  = useSessionBoard as unknown as Board
    const errorHandler = useErrorHandler

    const color = props.player !== undefined ?  (props.player === board.greenPlayer ?  "green" : "red"): "transparent"
    async function handleClick(id:string) {
         try {
            await newMovement(id)
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            // errorHandler.processRestValidations(error)
            // eslint-disable-next-line no-console
            console.log("error")
        }
    }
    return(
        <td id={props.id}
        onClick={void handleClick(props.id)}
        color = "green"
        style = {{padding : "50px", border: "1px solid black"}}></td>
    )
}