import { sendToBackground } from "@plasmohq/messaging"
import { useState } from "react"
import { Content, Full, Header, Nav, Pill } from "~component"

export default function RoomSelect(props) {
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
      <Header>
        <div className="grow">
          <h1>Hello</h1>
        </div>
        <Pill>
          <button onClick={Logout}>Logout</button>
        </Pill>
      </Header>
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
      <Nav>
        <button onClick={() => sendToBackground({ name: "socket-test" })}>
          Socket Test
        </button>
      </Nav>
    </Full>
  )
}
