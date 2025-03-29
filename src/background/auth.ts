import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export async function login(id: string, pw: string): Promise<string | null> {
  const ret = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ loginId: id, password: pw })
  })

  if (ret.status === 201) {
    const jwt = JSON.parse(await ret.text())["access_token"]
    await storage.set("jwt", jwt)
    return jwt
  }
  return null
}

export async function logout(): Promise<boolean> {
  await storage.set("jwt", false)
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
