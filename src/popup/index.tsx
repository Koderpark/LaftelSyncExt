import "../style.css"

import { useContext, useEffect, useState } from "react"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import { Full } from "~popup/component/layout"

import MainPopup from "~popup/page/Main"
import RoomPopup from "~popup/page/Room"
import SettingPopup from "~popup/page/Setting"

import Header from "~popup/layout/header"
import Navbar from "~popup/layout/nav"
import ChatPopup from "./page/Chat"
import { LogRenderer } from "./log"

export default function Index() {
  const [page] = useStorage("page")
  const [room] = useStorage("room")

  return (
    <div className="w-[320px] h-[480px] p-0">
      <Full>
        <LogRenderer />
        <Header />
        {page == "main" && room == null && <MainPopup />}
        {page == "main" && room != null && <RoomPopup />}
        {page == "setting" && <SettingPopup />}
        {page == "chat" && <ChatPopup />}
        <Navbar />
      </Full>
    </div>
  )
}