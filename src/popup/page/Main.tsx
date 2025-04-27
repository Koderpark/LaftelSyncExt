import { sendToBackground } from "@plasmohq/messaging"
import { useState } from "react"
import { Content, Full } from "~popup/component/layout"
import { PasswordField, StringField } from "~popup/component/form"
import { Btn } from "~popup/component/button"

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
            <Btn label="Join" onClick={submitJoin} submit={false} />
            <Btn label="Create" onClick={submitCreate} submit={false} />
          </div>
        </div>
      </Content>
    </Full>
  )
}
