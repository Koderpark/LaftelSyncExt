import "../style.css"

import { useContext, useEffect, useState } from "react"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { Full } from "~popup/component/layout"
import { NotiContext } from "~popup/component/noti"

import LoginPopup from "~popup/page/Login"
import MainPopup from "~popup/page/Main"
import RoomPopup from "~popup/page/Room"
import SettingPopup from "~popup/page/Setting"

import Header from "~popup/layout/header"
import Navbar from "~popup/layout/nav"
import { getRoomId } from "~background/room"
import { Noti } from "./component/noti"

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
  const [page] = useStorage("page")
  const [roomId] = useStorage("roomId")

  return (
    <Full>
      <Header />
      {page == "login" && <LoginPopup />}
      {page == "main" && !roomId && <MainPopup />}
      {page == "main" && roomId && <RoomPopup />}
      {page == "setting" && <SettingPopup />}
      <Navbar />
    </Full>
  )
}
