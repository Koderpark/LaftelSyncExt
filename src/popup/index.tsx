import { useReducer, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "../style.css"

import loginPopup from "./login"
import mainPopup from "./main"

export default function sync() {
  const [jwt, setJwt] = useState(null)

  sendToBackground({ name: "auth-check" }).then((res) => setJwt(res))

  return (
    <div className="w-64 h-64 bg-gray-100 flex flex-col items-center justify-center">
      {jwt ? mainPopup() : loginPopup()}
    </div>
  )
}
