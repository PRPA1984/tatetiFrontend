/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios"
import { environment } from "../app/environment/environment"
import { updateSessionUser } from "../store/userStore"
import { User } from "./userModel"
import { getCurrentUser } from './userService'
import { Board } from './../board/boardModel'
import { updateSessionBoard } from "../store/boardStore"

export async function newGame() : Promise<User>{
    const user = getCurrentUser as unknown as User
    const res = (await axios.get(environment.backendUrl + "/boards/newGame")).data
    if (res.state === "In queue") {
        user.matchmaking = true
        updateSessionUser(user)
    } else {
        const board = res.board as Board
        board.greenPlayer = res.green_player
        board.redPlayer = res.redPlayer
        debugger
        updateSessionBoard(board)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Promise.resolve(res)

}

// eslint-disable-next-line @typescript-eslint/require-await
export async function newMovement(id:string) {
    return
}
