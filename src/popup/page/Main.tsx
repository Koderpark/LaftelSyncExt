import { sendToBackground } from "@plasmohq/messaging"
import { useState } from "react"
import { Content, Full, Nav, Pill } from "~component"
import Navbar from "~component/nav"
import Header from "~popup/layout/header"

export default function MainPopup(props) {
  const { Logout } = props
  const [roomId, setRoomId] = useState("")
  const [roomName, setRoomName] = useState("")
  const [roomPW, setRoomPW] = useState("")

  const submitJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    sendToBackground({
      name: "room",
      body: { msg: "join", roomId, roomPW }
    })
  }

  const submitCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    sendToBackground({
      name: "room",
      body: { msg: "create", roomName, roomPW }
    })
  }

  return (
    <Full>
      <Header />
      <Content>
        <h1>Room Select</h1>
        <form>
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Room PW"
            onChange={(e) => setRoomPW(e.target.value)}
          />
          <Pill>
            <button type="submit" onClick={submitJoin}>
              Join
            </button>
          </Pill>
        </form>
        or
        <form>
          <input
            type="text"
            placeholder="Room Name"
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Pill>
            <button type="submit" onClick={submitCreate}>
              Create
            </button>
          </Pill>
        </form>
      </Content>
      <Navbar />
    </Full>
  )
}
