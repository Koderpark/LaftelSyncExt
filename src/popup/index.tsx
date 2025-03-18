import { useEffect, useReducer, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "../style.css"

import LoginPopup from "./login"
import MainPopup from "./main"

export default function sync() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const Login = async (id: string, pw: string) => {
    const res = await sendToBackground({
      name: "auth-login",
      body: { id, pw:"P@ssw0rd" }
    })

    if (res) {
      alert("Login success")
      setIsLoggedIn(true)
    }
    else alert("Login failed")
  }

  const Logout = async () => {
    const res = await sendToBackground({
      name: "auth-logout"
    })

    if (res) {
      alert("Logout success")
      setIsLoggedIn(false)
    }
    else alert("Logout failed")
  }

  useEffect(() => {
    sendToBackground({name: "auth-check"}).then((res) => setIsLoggedIn(res))
  }, [])

  return (
    <div className="w-64 h-96 bg-gray-100 flex flex-col items-center justify-center">
      {isLoggedIn && <MainPopup Logout={Logout} />}
      {!isLoggedIn && <LoginPopup Login={Login} />}
    </div>
  )
}
