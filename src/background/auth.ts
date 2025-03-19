import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export async function isLoggedIn(): Promise<boolean> {
  const jwt = await storage.get("jwt")
  if (!jwt) return false

  const ret = await fetch("http://localhost:3000/user/rawJwt", {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  if (ret.status === 200) return true
  return false
}

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
    return jwt["access_token"]
  }
  return null
}

export async function logout(): Promise<boolean> {
  await storage.remove("jwt")
  return true
}
