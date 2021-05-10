import axios, { AxiosError } from "axios"
import { environment } from "../app/environment/environment"
import { cleanupSessionBoard } from "../store/boardStore"
import { cleanupSessionMatch } from "../store/matchHistory"
import { updateSessionToken, cleanupSessionToken } from "../store/tokenStore"
import { cleanupSessionUser, updateSessionUser } from "../store/userStore"
import { User } from './userModel'

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

export interface Token {
  token: string
}

export async function login(params: {
  username: string
  password: string
}): Promise<Token> {
  const res = (
    await axios.post(environment.backendUrl + "/users/login", params)
  ).data as Token

  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentUser().then()
  return res
}

// Valores almacenados en LOCAL STORE
function getCurrentToken(): string | undefined {
  const result = localStorage.getItem("token")
  return result ? result : undefined
}

function setCurrentToken(token: string) {
  localStorage.setItem("token", token)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios.defaults.headers.common.Authorization = token
}

export function getCurrentUser(): User | undefined {
  const userStorage = localStorage.getItem("user")

  return userStorage ? JSON.parse(userStorage) as User : undefined
}

export async function logout(): Promise<void> {
  await axios.get(environment.backendUrl + "/users/logout")

  localStorage.removeItem("token")
  localStorage.removeItem("user")
  localStorage.removeItem("board")

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios.defaults.headers.common.Authorization = ""

  cleanupSessionToken()
  cleanupSessionUser()
  cleanupSessionBoard()
  return Promise.resolve()
}



export async function reloadCurrentUser() {
  try {
    const res = (await axios.get(environment.backendUrl + "/users/current"))
      .data as User
    localStorage.setItem("user", JSON.stringify(res))
    updateSessionUser(res)
    return res
  } catch (err) {
      void logout()
  }
}

export async function register(params: {
  name: string
  password: string
  username: string
}): Promise<Token> {
  const res = (await axios.post(environment.backendUrl + "/users/", params))
    .data as Token
  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentUser()
  return Promise.resolve(res)
}
