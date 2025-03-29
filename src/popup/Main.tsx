import { useContext, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { Content, Header, Noti, NotiContext, Pill } from "~component"
import { useStorage } from "@plasmohq/storage/hook"
import RoomSelect from "./RoomSelect"

export default function mainPopup(props) {
  const { Logout } = props
  const [roomId] = useStorage("roomId")
  const { openNoti } = useContext(NotiContext)

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
        {roomId}
        {roomId && <Body openNoti={openNoti} />}
        {!roomId && <RoomSelect />}
      </Content>
    </div>
  )
}

function Body(props) {
  const { openNoti } = props
  return (
    <div>
      <button onClick={() => openNoti("hello", "info")}>Open Noti</button>
      <button onClick={() => sendToBackground({ name: "socket-test" })}>
        Socket Test
      </button>
      <button onClick={() => sendToBackground({ name: "socket-test2" })}>
        Socket Test
      </button>
    </div>
  )
}
