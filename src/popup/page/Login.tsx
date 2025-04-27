import { useState } from "react"

import { Content } from "../component/layout"
import { StringField, PasswordField, SubmitBtn } from "../component/form"

export default function loginPopup(props) {
  const { Login } = props
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    Login(id, pw)
  }

  return (
    <div className="w-full h-full flex flex-col p-0">
      <Content>
        <form className="w-full flex flex-col gap-2">
          <StringField label="Username" value={id} setValue={setId} />
          <PasswordField label="Password" value={pw} setValue={setPw} />
          <SubmitBtn label="Login" onClick={handleLogin} />
        </form>
      </Content>
    </div>
  )
}
