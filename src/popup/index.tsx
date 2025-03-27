import "../style.css"

import { Noti } from "~component"
import { useContext, useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"

import { NotiContext } from "~component"
import LoginPopup from "~popup/Login"
import MainPopup from "~popup/Main"

export default function notiWrapper() {
  return (
    <Noti>
      <div className="w-[320px] h-[480px] bg-gray-100 p-0">
        <IndexPopup />
      </div>
    </Noti>
  )
}

export function IndexPopup(props) {
  const [jwt] = useStorage("jwt")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { openNoti } = useContext(NotiContext)

  const Login = async (id: string, pw: string) => {
    const res = await sendToBackground({
      name: "auth-login",
      body: { id, pw: "P@ssw0rd" }
    })
    if (res) openNoti("Login success", "success")
    else openNoti("Login failed", "error")
  }

  const Logout = async () => {
    const res = await sendToBackground({
      name: "auth-logout"
    })

    if (res) openNoti("Logout success", "success")
    else openNoti("Logout failed", "error")
  }

  useEffect(() => {
    const validateJWT = async () => {
      const res = await sendToBackground({
        name: "auth-validate",
        body: { jwt }
      })
      if (res) setIsLoggedIn(true)
      else setIsLoggedIn(false)
    }
    validateJWT()
  }, [jwt])

  return (
    <div>
      {isLoggedIn && <MainPopup Logout={Logout} />}
      {!isLoggedIn && <LoginPopup Login={Login} />}
    </div>
  )
}
