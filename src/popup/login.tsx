import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import type { promises } from "dns"

export default function loginPopup(props) {
  const { Login } = props
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPw(e.target.value)}
        />
        <button type="submit" onClick={(e) => {
          e.preventDefault()
          Login(id, pw)
        }}>
          Login
        </button>
      </form>
    </div>
  )
}