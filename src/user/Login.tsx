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
import { login } from "./userService"

export default function Login(props: RouteComponentProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const errorHandler = useErrorHandler()

    const loginClick = async () => {
        errorHandler.cleanRestValidations()
        if (!username) {
            errorHandler.addError("username", "No puede estar vacío")
        }
        if (!password) {
            errorHandler.addError("password", "No puede estar vacío")
        }
        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await login({
                username,
                password
            })
            goHome(props)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    return (
        <GlobalContent>
            <FormTitle>Login</FormTitle>
            <Form>
                <FormInput
                    label="Usuario"
                    name="username"
                    errorHandler={errorHandler}
                    onChange={(event) => setUsername(event.target.value)} />

                <FormPassword
                    label="Password"
                    name="password"
                    errorHandler={errorHandler}
                    onChange={(event) => setPassword(event.target.value)} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Login" onClick={loginClick} />
                    <FormButton label="Cancel" onClick={() => goHome(props)} />
                </FormButtonBar>
            </Form >
        </GlobalContent >
    )
}
