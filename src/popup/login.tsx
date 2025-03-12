import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

export default function loginPopup() {
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
      </form>
      <button
        onClick={async () => {
          const res = await sendToBackground({
            name: "auth-login",
            body: { id, pw }
          })

          if (res) {
            alert(res)
          } else {
            alert("Login failed")
          }
        }}>
        Login
      </button>
    </div>
  )
}
