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
import { Noti } from "./component/noti"
import ChatPopup from "./page/Chat"

export default function Index() {
  const [page] = useStorage("page")
  const [room] = useStorage("room")

  return (
    <Noti>
      <div className="w-[320px] h-[480px] p-0">
        <Full>
          <Header />
          {page == "login" && <LoginPopup />}
          {page == "main" && room == null && <MainPopup />}
          {page == "main" && room != null && <RoomPopup />}
          {page == "setting" && <SettingPopup />}
          {page == "chat" && <ChatPopup />}
          <Navbar />
        </Full>
      </div>
    </Noti>
  )
}