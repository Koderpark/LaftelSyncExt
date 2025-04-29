import { useContext, useState } from "react"
import { sendToBackground } from "@plasmohq/messaging"
import { Content } from "../component/layout"
import { StringField, PasswordField } from "../component/form"
import { NotiContext } from "../component/noti"
import { useStorage } from "@plasmohq/storage/hook"
import { Btn } from "../component/button"

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

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await message("page/newTab", { url: "https://laftel.net" }) // TODO: 회원가입 페이지로 이동
  }

  return (
    <div className="w-full h-full flex flex-col p-0">
      <Content>
        <form className="w-full flex flex-col gap-2">
          <StringField label="Username" value={id} setValue={setId} />
          <PasswordField label="Password" value={pw} setValue={setPw} />
          <div className="flex gap-2">
            <Btn label="Login" onClick={handleLogin} />
            <Btn
              label="Signup"
              onClick={handleSignup}
              submit={false}
              type="option"
            />
          </div>
        </form>
      </Content>
    </div>
  )
}
