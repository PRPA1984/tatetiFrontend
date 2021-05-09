import axios from 'axios'
import { useState, useLayoutEffect } from 'react'
import { Subject } from 'rxjs'
import { environment } from '../app/environment/environment'
import { getCurrentBoard, setCurrentBoard } from '../user/playerService'
import { Board } from './../board/boardModel'

let currentMatch: any

const matchSubject = new Subject<any>()

export function useSessionMatch() {
  const [match, setMatch] = useState()

  useLayoutEffect(() => {
    matchSubject.subscribe((newState) => {
      setMatch(newState)
    })
  }, [])

  return match
}


export function updateSessionMatch(match : any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    currentMatch = match
    matchSubject.next(currentMatch)
  }
export function cleanupSessionMatch() {
    currentMatch = undefined
    matchSubject.next(currentMatch)
  }