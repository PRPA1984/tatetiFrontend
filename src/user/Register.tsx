import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import DangerLabel from "../common/components/DangerLabel"
import Form from "../common/components/Form"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormButtonBar from "../common/components/FormButtonBar"
import FormInput from "../common/components/FormInput"
import FormPassword from "../common/components/FormPassword"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import "../styles.css"
import { register } from "./userService"

export default function Register(props: RouteComponentProps) {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const errorHandler = useErrorHandler()

  const registerClick = async () => {
    errorHandler.cleanRestValidations()
    if (!username) {
      errorHandler.addError("username", "No puede estar vacío")
    }
    if (!name) {
      errorHandler.addError("name", "No puede estar vacío")
    }
    if (!password) {
      errorHandler.addError("password", "No puede estar vacío")
    }
    if (password.length < 8) {
      errorHandler.addError("password", "No puede tener menos de 8 caracteres")
    }
    if (password !== password2) {
      errorHandler.addError("password2", "Las contraseñas no coinciden")
    }

    if (errorHandler.hasErrors()) {
      return
    }

    try {
      await register({
        username,
        name,
        password,
      })
      goHome(props)
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }

  return (
    <GlobalContent>
      <FormTitle>Registrar Usuario</FormTitle>

      <Form>
        <FormInput
          label="Username"
          name="username"
          value={username}
          errorHandler={errorHandler}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormInput
          label="Nickname"
          name="name"
          value={name}
          errorHandler={errorHandler}
          onChange={(e) => setName(e.target.value)}
        />

        <FormPassword
          label="Password"
          name="password"
          value={password}
          errorHandler={errorHandler}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormPassword
          label="Repetir Password"
          name="password2"
          value={password2}
          errorHandler={errorHandler}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <DangerLabel message={errorHandler.errorMessage} />

        <FormButtonBar>
          <FormAcceptButton label="Register" onClick={registerClick} />
          <FormButton label="Cancel" onClick={() => goHome(props)} />
        </FormButtonBar>
      </Form>
    </GlobalContent>
  )
}
