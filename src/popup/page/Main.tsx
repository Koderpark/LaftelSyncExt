import { sendToBackground } from "@plasmohq/messaging"
import { useContext, useState } from "react"
import { Content, Full } from "~popup/component/layout"
import { PasswordField, StringField } from "~popup/component/form"
import { Btn } from "~popup/component/button"
import { message } from "~popup/message"

export default function MainPopup(props) {
  const [roomId, setRoomId] = useState("")
  const [roomName, setRoomName] = useState("")
  const [roomPw, setRoomPw] = useState("")

  const submitJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    message("room/join", { roomId, roomPw })
  }

  const submitCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    message("room/create", { roomName, roomPw })
  }

  return (
    <Full>
      <Content>
        <h1 className="text-xl font-bold mb-2">방 참가 및 생성</h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <StringField label="Room ID" value={roomId} setValue={setRoomId} />{" "}
            <StringField
              label="Room Name"
              value={roomName}
              setValue={setRoomName}
            />
          </div>
          <PasswordField label="Room PW" value={roomPw} setValue={setRoomPw} />
          <div className="flex gap-2">
            <Btn label="Join" onClick={submitJoin} submit={false} />
            <Btn label="Create" onClick={submitCreate} submit={false} />
          </div>
        </div>
      </Content>
    </Full>
  )
}
