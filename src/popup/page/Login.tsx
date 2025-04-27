import { useContext, useState } from "react"
import { sendToBackground } from "@plasmohq/messaging"
import { Content } from "../component/layout"
import { StringField, PasswordField, SubmitBtn } from "../component/form"
import { NotiContext } from "../component/noti"
import { useStorage } from "@plasmohq/storage/hook"

export default function loginPopup(props) {
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")
  const { openNoti, message } = useContext(NotiContext)
  const [page, setPage] = useStorage("page")

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const res = await message("auth/login", { id, pw: "P@ssw0rd" })
    if (res) openNoti("로그인 성공", "success")
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
