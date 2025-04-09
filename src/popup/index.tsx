import "../style.css"

import { Full, Noti } from "~component"
import { useContext, useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"

import { NotiContext } from "~component"
import LoginPopup from "~popup/Login"
import MainPopup from "~popup/Main"

export default function notiWrapper() {
  return (
    <Noti>
      <div className="w-[320px] h-[480px] p-0">
        <IndexPopup />
      </div>
    </Noti>
  )
}

export function IndexPopup(props) {
  const [jwt] = useStorage("jwt")
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
    <Full>
      {jwt && <MainPopup Logout={Logout} />}
      {!jwt && <LoginPopup Login={Login} />}
    </Full>
  )
}

