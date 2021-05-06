
import { useState, useLayoutEffect } from 'react'
import { Subject } from 'rxjs'
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

export function updateSessionBoard(board : Board) {
    currentBoard = board
    boardSubject.next(currentBoard)
  }
export function cleanupSessionBoard() {
    currentBoard = undefined
    boardSubject.next(currentBoard)
  }