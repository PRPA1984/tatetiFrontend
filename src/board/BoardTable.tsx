/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react'
import DangerLabel from '../common/components/DangerLabel'
import { ErrorHandler, useErrorHandler } from '../common/utils/ErrorHandler'
import { newMovement } from './boardService'
import { User } from '../user/userModel'
import { useSessionBoard } from './../store/boardStore'
import { useSessionUser } from './../store/userStore'
import { Board } from './boardModel'
import { ButtonFindGame } from './ButtonFindGame'
import "./Board.css"

export function BoardTable() {
    const board = useSessionBoard() as Board
    const user = useSessionUser() as User
    const errorHandler = useErrorHandler()

    const team:string = board.greenPlayer === user.name ? "green" : "red"
    const enemyTeam:string = board.greenPlayer === user.name ? "red" : "green"
    const enemyPlayer:string = team === "green" ? board.redPlayer : board.greenPlayer
    const alliedPlayer:string = user.name

    return (
        <div className = "board">
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
                            <BoardRow id="1" player={board.board["1"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam} errorHandler={errorHandler}/>
                            <BoardRow id="2" player={board.board["2"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam} errorHandler={errorHandler}/>
                            <BoardRow id="3" player={board.board["3"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam} errorHandler={errorHandler}/>
                        </tr>
                        <tr>
                            <BoardRow id="4" player={board.board["4"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam} errorHandler={errorHandler}/>
                            <BoardRow id="5" player={board.board["5"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam} errorHandler={errorHandler}/>
                            <BoardRow id="6" player={board.board["6"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam} errorHandler={errorHandler}/>
                        </tr>
                        <tr>
                            <BoardRow id="7" player={board.board["7"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam} errorHandler={errorHandler}/>
                            <BoardRow id="8" player={board.board["8"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam} errorHandler={errorHandler}/>
                            <BoardRow id="9" player={board.board["9"]} alliedPlayer = {alliedPlayer} team = {team} enemyTeam = {enemyTeam} errorHandler={errorHandler}/>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className = "board-labels">
                <h1 color = {team === board.turn ? team : enemyTeam}>{board.winner ? "The winner is: " + board.winner: (team === board.turn ? "Your Turn" : enemyPlayer + "'s Turn")}</h1>
                <DangerLabel message={errorHandler.errorMessage}/>
                {board.winner ? <ButtonFindGame label="New Game"/> : null}
            </div>
        </div>
    )
}

function BoardRow(props: {id: string, player: string | undefined, alliedPlayer:string, team:string, enemyTeam:string, errorHandler:ErrorHandler}) {
    const color = props.player !== undefined ?  (props.player === props.alliedPlayer ?  props.team : props.enemyTeam) : "transparent"
    const handleClick = async (id:string) => {
         try {
            props.errorHandler.cleanRestValidations()
            await newMovement(id)
        } catch (error) {
            props.errorHandler.processRestValidations(error)
        }
    }

    return(
        <td id={props.id}
        onClick={() => handleClick(props.id)}
        style = {{padding : "50px", border: "1px solid black", backgroundColor: color}}></td>
    )
}