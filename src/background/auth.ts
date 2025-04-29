import { Storage } from "@plasmohq/storage"
import { exitRoom, getRoomId } from "./room"
const storage = new Storage()

/**
 * 로그인 요청
 * @param id 아이디
 * @param pw 비밀번호
 * @returns 로그인 성공 여부 (boolean)
 */
export async function login(id: string, pw: string): Promise<boolean> {
  const ret = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ loginId: id, password: pw })
  })

  if (ret.status !== 201) return false

  const jwt = JSON.parse(await ret.text())["access_token"]
  await storage.set("jwt", jwt)
  await storage.set("page", "main")
  await getRoomId()
  return true
}

/**
 * 로그아웃 요청
 * @returns 로그아웃 성공 여부 (boolean)
 */
export async function logout(): Promise<boolean> {
  await exitRoom()
  await storage.set("jwt", false)
  await storage.set("page", "login")
  return true
}

/**
 * jwt를 포함한 fetch
 * @param url 요청 URL
 * @param method 요청 메서드
 * @param body 요청 본문
 * @returns 응답 데이터 (any)
 */
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
