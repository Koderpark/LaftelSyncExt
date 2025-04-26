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

import Header from "~popup/layout/header"
import Navbar from "~popup/layout/nav"
import { getRoomId } from "~background/room"

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
  const [page, setPage] = useStorage("page")
  const { openNoti } = useContext(NotiContext)
  const [roomId] = useStorage("roomId")
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

  return (
    <Full>
      <Header />
      {page == "login" && <LoginPopup Login={Login} />}
      {page == "main" && !roomId && <MainPopup />}
      {page == "main" && roomId && <RoomPopup />}
      {page == "setting" && <SettingPopup Logout={Logout} />}
      <Navbar />
    </Full>
  )
}
