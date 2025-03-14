import { useReducer, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "../style.css"

import LoginPopup from "./login"
import MainPopup from "./main"

export default function sync() {
  const [jwt, setJwt] = useState(null)
  sendToBackground({ name: "auth-check" }).then((res) => setJwt(res))

  return (
    <div className="w-64 h-96 bg-gray-100 flex flex-col items-center justify-center">
      {jwt && <MainPopup />}
      {!jwt && <LoginPopup />}
    </div>
  )
}
