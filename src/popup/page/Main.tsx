import { sendToBackground } from "@plasmohq/messaging"
import { useState } from "react"
import { Content, Full, Nav, Pill } from "~popup/component"
import Navbar from "~popup/layout/nav"
import Header from "~popup/layout/header"
import {
  Form,
  PasswordField,
  StringField,
  SubmitBtn
} from "~popup/component/form"

export default function MainPopup(props) {
  const { Logout } = props
  const [selectId, setSelectId] = useState("")
  const [createName, setCreateName] = useState("")
  const [PW, setPW] = useState("")

  const submitJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    sendToBackground({
      name: "room",
      body: { msg: "join", roomId: selectId, roomPW: PW }
    })
  }

  const submitCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    sendToBackground({
      name: "room",
      body: { msg: "create", roomName: createName, roomPW: PW }
    })
  }

  return (
    <Full>
      <Content>
        <h1 className="text-xl font-bold mb-2">방 참가 및 생성</h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <StringField
              label="Room ID"
              value={selectId}
              setValue={setSelectId}
            />{" "}
            <StringField
              label="Room Name"
              value={createName}
              setValue={setCreateName}
            />
          </div>
          <PasswordField label="Room PW" value={PW} setValue={setPW} />
          <div className="flex gap-2">
            <SubmitBtn label="Join" onClick={submitJoin} />
            <SubmitBtn label="Create" onClick={submitCreate} />
          </div>
        </div>
      </Content>
    </Full>
  )
}
