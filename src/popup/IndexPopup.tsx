import { useContext, useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { NotiContext } from "~component"
import LoginPopup from "~popup/LoginPopup"
import MainPopup from "~popup/MainPopup"

export function IndexPopup(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { openNoti } = useContext(NotiContext)

  const Login = async (id: string, pw: string) => {
    const res = await sendToBackground({
      name: "auth-login",
      body: { id, pw: "P@ssw0rd" }
    })

    if (res) {
      setIsLoggedIn(true)
      openNoti(<h1>Login success</h1>, "success")
    } else openNoti(<h1>Login failed</h1>, "error")
  }

  const Logout = async () => {
    const res = await sendToBackground({
      name: "auth-logout"
    })

    if (res) {
      setIsLoggedIn(false)
      openNoti(<h1>Logout success</h1>, "success")
    } else openNoti(<h1>Logout failed</h1>, "error")
  }

  useEffect(() => {
    sendToBackground({ name: "auth-check" }).then((res) => setIsLoggedIn(res))
  }, [])

  return (
    <div className="w-[320px] h-[480px] bg-gray-100 p-0">
      {isLoggedIn && <MainPopup Logout={Logout} />}
      {!isLoggedIn && <LoginPopup Login={Login} />}
    </div>
  )
}
