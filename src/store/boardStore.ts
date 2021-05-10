/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */

import axios from 'axios'
import { useState, useLayoutEffect } from 'react'
import { Subject } from 'rxjs'
import { environment } from '../app/environment/environment'
import { ErrorHandler, useErrorHandler } from '../common/utils/ErrorHandler'
import { getCurrentBoard, setCurrentBoard } from '../board/boardService'
import { Board } from './../board/boardModel'

let currentBoard: Board | undefined

const boardSubject = new Subject<Board>()

export function useSessionBoard() {
  const [board, setBoard] = useState(currentBoard)

  useLayoutEffect(() => {
    boardSubject.subscribe((newState) => {
      setBoard(newState)
    })
  }, [])

  return board
}

export function startBoardReload(){
  const interval = setInterval(async () => {
    console.log("realoding board")
    const board = getCurrentBoard() as Board
    const res = (await axios.get(`${environment.backendUrl}/boards/${board.id}`)).data

    if (res !== board) {
        updateSessionBoard(res)
        setCurrentBoard(res)
        if (res.winner !== null) {
            clearInterval(interval)
        }
    }

  }, 1000)
}

export function updateSessionBoard(board : Board) {
    currentBoard = board
    boardSubject.next(currentBoard)
  }
export function cleanupSessionBoard() {
    currentBoard = undefined
    boardSubject.next(currentBoard)
  }