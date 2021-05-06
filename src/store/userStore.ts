import { Subject } from "rxjs"
import { useState, useLayoutEffect } from "react"
import { User } from './../user/userModel'

let currentUser: User | undefined

const userSubject = new Subject<User>()

export function useSessionUser() {
  const [user, setUser] = useState(currentUser)

  useLayoutEffect(() => {
    userSubject.subscribe((newState) => {
      setUser(newState)
    })
  }, [])

  return user
}

export function updateSessionUser(user: User) {
  currentUser = user
  userSubject.next(currentUser)
}

export function cleanupSessionUser() {
  currentUser = undefined
  userSubject.next(currentUser)
}
