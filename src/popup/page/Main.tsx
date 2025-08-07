import { sendToBackground } from "@plasmohq/messaging"
import { useContext, useState } from "react"
import { Content, Full } from "~popup/component/layout"
import { PasswordField, StringField } from "~popup/component/form"
import { Btn } from "~popup/component/button"
import { message } from "~popup/message"

export default function MainPopup(props) {
  return (
    <Full>
      <Content>
        <div className="flex flex-col gap-8">
          <JoinForm />
          <CreateForm />
        </div>
      </Content>
    </Full>
  )
}

function JoinForm() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const submitJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    message("room/join", { roomId: id, password })
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-2">방 참가</h1>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 grow">
          <StringField label="방 접속 번호" value={id} setValue={setId} />
          <PasswordField
            label="방 비밀번호 (optional)"
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="flex">
          <Btn label="참가" onClick={submitJoin} submit={false} />
        </div>
      </div>
    </div>
  )
}

function CreateForm() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const submitJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    message("room/create", { name, password })
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-2">방 생성</h1>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 grow">
          <StringField label="방 이름" value={name} setValue={setName} />
          <PasswordField
            label="방 비밀번호 (optional)"
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="flex">
          <Btn label="생성" onClick={submitJoin} submit={false} />
        </div>
      </div>
    </div>
  )
}