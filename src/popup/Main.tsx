import { useContext, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { Content, Header, Noti, NotiContext, Pill } from "~component"
import { useStorage } from "@plasmohq/storage/hook"
import RoomSelect from "./RoomSelect"
import Room from "./Room"
import { Full } from "~component/layout"

export default function mainPopup(props) {
  const { Logout } = props
  const [roomId] = useStorage("roomId")

  return (
    <Full>
      {roomId != -1 && <Room Logout={Logout} />}
      {roomId == -1 && <RoomSelect Logout={Logout} />}
    </Full>
  )
}