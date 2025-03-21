import { useContext, useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"

import { NotiContext } from "~component"
import LoginPopup from "~popup/LoginPopup"
import MainPopup from "~popup/MainPopup"

export function IndexPopup(props) {
  const [isLoggedIn] = useStorage("isLoggedIn")

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

  return (
    <div className="w-[320px] h-[480px] bg-gray-100 p-0">
      {isLoggedIn && <MainPopup Logout={Logout} />}
      {!isLoggedIn && <LoginPopup Login={Login} />}
    </div>
  )
}
