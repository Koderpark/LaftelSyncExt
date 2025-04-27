import { useContext, useEffect } from "react"
import { Content, Full, Nav, NotiContext, Pill } from "~popup/component"
import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"
import Navbar from "~popup/layout/nav"
import Header from "~popup/layout/header"

export default function RoomPopup(props) {
  const { Logout } = props
  const { openNoti } = useContext(NotiContext)
  const [roomId] = useStorage("roomId")
  const [isRoomOwner] = useStorage("isRoomOwner")

  const exit = async () => {
    const res = await sendToBackground({ name: "room", body: { msg: "exit" } })
    if (res) openNoti("Exit success", "success")
    else openNoti("Exit failed", "error")
  }

  const checkOwner = async () => {
    await sendToBackground({
      name: "room",
      body: { msg: "checkOwner" }
    })
  }

  useEffect(() => {
    checkOwner()
  }, [])

  return (
    <Full>
      <Content>
        <h1>Room {roomId}</h1>
        {isRoomOwner && <h1>you are owner of this room</h1>}
        {!isRoomOwner && <h1>you are not owner of this room</h1>}

        <button onClick={() => openNoti("hello", "info")}>Open Noti</button>
        <button onClick={() => sendToBackground({ name: "socket-test" })}>
          Socket Test
        </button>
        <Pill>
          <button onClick={() => exit()}>Exit</button>
        </Pill>
      </Content>
      <Nav>
        <button onClick={() => openNoti("hello", "info")}>Open Noti</button>
        <button
          onClick={() =>
            sendToBackground({ name: "video", body: { msg: "parse" } })
          }>
          parse video
        </button>
      </Nav>
    </Full>
  )
}
