import { Storage } from "@plasmohq/storage"

import { shake } from "./socket"

const storage = new Storage()

export async function login(id: string, pw: string): Promise<string | null> {
  const ret = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ loginId: id, password: pw })
  })

  if (ret.status === 201) {
    const jwt = JSON.parse(await ret.text())

    await storage.set("jwt", jwt["access_token"])
    await storage.set("isLoggedIn", true)
    return jwt["access_token"]
  }
  return null
}

export async function logout(): Promise<boolean> {
  await storage.set("isLoggedIn", false)
  await storage.remove("jwt")
  return true
}

export async function authRequest(
  url: string,
  method: string,
  body: any
): Promise<any> {
  const jwt = await storage.get("jwt")
  if (!jwt) {
    await logout()
    return null
  }

  const ret = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${jwt}` },
    body
  })

  if (ret.status === 401) {
    await logout()
    return null
  }
  return JSON.parse(await ret.text())
}
