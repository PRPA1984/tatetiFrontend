/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios"
import { environment } from "../app/environment/environment"
import { updateSessionUser } from "../store/userStore"
import { User } from "./userModel"
import { getCurrentUser } from './userService'
import { Board } from './../board/boardModel'
import { updateSessionBoard } from "../store/boardStore"

export async function newGame() : Promise<User>{
    const user: User = getCurrentUser
    const res = (await axios.get(environment.backendUrl + "/v1/user")).data
    if (res.state === "In queue") {
        user.state = res.state
        updateSessionUser(user)
    } else {
        const board = res.board as Board
        board.greenPlayer = res.green_player
        board.redPlayer = res.redPlayer
        updateSessionBoard(board)
    }
    return Promise.resolve(res)

}

export async function newGame(id:string) {
    
}
