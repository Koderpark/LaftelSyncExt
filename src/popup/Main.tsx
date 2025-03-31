import { useContext, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { Content, Header, Noti, NotiContext, Pill } from "~component"
import { useStorage } from "@plasmohq/storage/hook"
import RoomSelect from "./RoomSelect"
import Room from "./Room"

export default function mainPopup(props) {
  const { Logout } = props
  const [roomId] = useStorage("roomId")

  return (
    <div>
      <Header>
        <div className="grow">
          <h1>Hello</h1>
        </div>
        <Pill>
          <button onClick={Logout}>Logout</button>
        </Pill>
      </Header>
      <Content>
        {roomId != -1 && <Room />}
        {roomId == -1 && <RoomSelect />}
      </Content>
    </div>
  )
}