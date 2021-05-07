/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios"
import { environment } from "../app/environment/environment"
import { updateSessionUser, useSessionUser } from "../store/userStore"
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
        localStorage.setItem("user", JSON.stringify(user))


        let flag : boolean


        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const interval = setInterval(async () => {
            console.log("Interval")
            const check = (await axios.get(environment.backendUrl + "/boards/userState")).data.state
            
            if (check !== "In queue") {
                console.log("end")
                const new_res = (await axios.get(environment.backendUrl + "/boards/lastBoard")).data as Board
                updateSessionBoard(new_res)
                user.matchmaking = false
                updateSessionUser(user)
                setCurrentBoard(new_res)
                clearInterval(interval)
            }

        }, 1000)

    } else {
        const board = res as Board
        updateSessionBoard(board)
        setCurrentBoard(board)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Promise.resolve(res)

}


export async function newMovement(id:string) {
    const board = getCurrentBoard as unknown as Board
    const res = (await axios.get(environment.backendUrl + `/boards/${board.id.toString()}/newTurn`)).data as Board

    updateSessionBoard(res)
    setCurrentBoard(board)

    return Promise.resolve(res)
}


function setCurrentBoard(board : Board) {
    localStorage.setItem("board", JSON.stringify(board))
}
export function getCurrentBoard(): Board | undefined {
    return (localStorage.getItem("board") as unknown) as Board
  }