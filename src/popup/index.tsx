import "../style.css"

import { Full, Noti } from "~component"
import { useContext, useEffect, useState } from "react"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { NotiContext } from "~component"

import LoginPopup from "~popup/page/Login"
import MainPopup from "~popup/page/Main"
import RoomPopup from "~popup/page/Room"
import SettingPopup from "~popup/page/Setting"
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
  const [page, setPage] = useStorage("page", (v) => v || "login")
  const { openNoti } = useContext(NotiContext)

  const Login = async (id: string, pw: string) => {
    const res = await sendToBackground({
      name: "auth",
      body: { msg: "login", id, pw: "P@ssw0rd" }
    })
    if (res) {
      openNoti("Login success", "success")
      setPage("main")
    } else openNoti("Login failed", "error")
  }

  const Logout = async () => {
    const res = await sendToBackground({
      name: "auth",
      body: { msg: "logout" }
    })

    if (res) {
      openNoti("Logout success", "success")
      setPage("login")
    } else openNoti("Logout failed", "error")
  }

  const Navbar = () => {
    return <div>Navbar</div>
  }

  return (
    <Full>
      {page == "login" && <LoginPopup Login={Login} />}
      {page == "main" && <MainPopup />}
      {page == "room" && <RoomPopup />}
      {page == "setting" && <SettingPopup />}
    </Full>
  )
}
