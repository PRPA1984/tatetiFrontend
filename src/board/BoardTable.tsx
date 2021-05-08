/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import FormTitle from '../common/components/FormTitle'
import { useErrorHandler } from '../common/utils/ErrorHandler'
import { newMovement } from '../user/playerService'
import { User } from '../user/userModel'
import { useSessionBoard } from './../store/boardStore'
import { useSessionUser } from './../store/userStore'
import { Board } from './boardModel'

export function BoardTable() {
    const board = useSessionBoard() as Board
    const user = useSessionUser() as User

    const team:string = board.greenPlayer === user.name ? "green" : "red"
    const enemyTeam:string = board.greenPlayer === user.name ? "red" : "green"
    const enemyPlayer:string = team === "green" ? board.redPlayer : board.greenPlayer
    const alliedPlayer:string = team === "green" ? board.greenPlayer : board.redPlayer
    return (
    <div>
        <FormTitle>{board.winner ? "The winner is: " + board.winner: (team === board.turn ? "Your Turn" : enemyPlayer + "'s Turn")}</FormTitle>
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
                    <BoardRow id="1" player={board.board["1"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam}/>
                    <BoardRow id="2" player={board.board["2"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam}/>
                    <BoardRow id="3" player={board.board["3"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam}/>
                </tr>
                <tr>
                    <BoardRow id="4" player={board.board["4"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam}/>
                    <BoardRow id="5" player={board.board["5"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam}/>
                    <BoardRow id="6" player={board.board["6"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam}/>
                </tr>
                <tr>
                    <BoardRow id="7" player={board.board["7"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam}/>
                    <BoardRow id="8" player={board.board["8"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam}/>
                    <BoardRow id="9" player={board.board["9"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam}/>
                </tr>
            </tbody>
        </table>
    </div>
    )
}

function BoardRow(props: {id: string, player: string | undefined, alliedPlayer:string, team:string, enemyTeam:string}) {
    const errorHandler = useErrorHandler
    const color = props.player !== undefined ?  (props.player === props.alliedPlayer ?  props.team : props.enemyTeam) : "transparent"
    const handleClick = async (id:string) => {
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
        onClick={() => handleClick(props.id)}
        color = {color}
        style = {{padding : "50px", border: "1px solid black", backgroundColor: color}}></td>
    )
}