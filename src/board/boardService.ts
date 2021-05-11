/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios"
import { environment } from "../app/environment/environment"
import { updateSessionUser} from "../store/userStore"
import { User } from "../user/userModel"
import { getCurrentUser } from '../user/userService'
import { Board } from './boardModel'
import { cleanupSessionBoard, startBoardReload, updateSessionBoard } from "../store/boardStore"

export async function newGame() : Promise<User>{
    cleanupSessionBoard()
    localStorage.removeItem("board")
    const user = getCurrentUser() as unknown as User
    const res = (await axios.get(environment.backendUrl + "/boards/newGame")).data
    if (res.state === "In queue") {
        user.matchmaking = true
        updateSessionUser(user)
        localStorage.setItem("user", JSON.stringify(user))

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const interval = setInterval(async () => {
            const check = (await axios.get(environment.backendUrl + "/boards/userState")).data.state
            if (check !== "In queue") {
                const newRes = (await axios.get(environment.backendUrl + "/boards/lastBoard")).data as Board
                updateSessionBoard(newRes)
                user.matchmaking = false
                updateSessionUser(user)
                setCurrentBoard(newRes)
                clearInterval(interval)
                startBoardReload()
            }

        }, 1000)

    } else {
        const board = res as Board
        updateSessionBoard(board)
        setCurrentBoard(board)
        startBoardReload()
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Promise.resolve(res)

}


export async function newMovement(id:string) {
    const board = getCurrentBoard() as Board
    // eslint-disable-next-line camelcase
    const res = (await axios.post(environment.backendUrl + `/boards/${board.id.toString()}/newTurn`, {selected_row : id})).data as Board

    updateSessionBoard(res)
    setCurrentBoard(res)
    return Promise.resolve(res)
}

export async function matchHistory() {
    const res = (await axios.get(environment.backendUrl + "/users/matchHistory")).data
    return Promise.resolve(res)
}

export function setCurrentBoard(board : Board) {
    localStorage.setItem("board", JSON.stringify(board))
}
export function getCurrentBoard(): Board | undefined {
    const boardStorage = localStorage.getItem("board")
    return boardStorage ? JSON.parse(boardStorage) as Board : undefined
  }