import { Storage } from "@plasmohq/storage"
import { exitRoom, roomRenew } from "./room"
const storage = new Storage()

/**
 * 로그인 요청
 * @param id 아이디
 * @param pw 비밀번호
 * @returns 로그인 성공 여부 (boolean)
 */
export async function login(id: string, pw: string): Promise<boolean> {
  console.log("login")
  const ret = await Request("http://localhost:3000/auth/login", "POST", {
    loginId: id,
    password: pw
  })

  if (!ret) return false

  await storage.set("jwt", ret.access_token)
  await storage.set("page", "main")
  await roomRenew()
  return true
}

/**
 * 로그아웃 요청
 * @returns 로그아웃 성공 여부 (boolean)
 */
export async function logout(): Promise<boolean> {
  console.log("logout")
  await exitRoom()
  await storage.set("jwt", false)
  await storage.set("room", null)
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
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: any = {}
): Promise<any | null> {
  console.log("authRequest")
  const jwt = await storage.get("jwt")
  if (!jwt) return errorHandler()

  try {
    const ret = await fetch(url, {
      method,
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      body: method === "GET" ? undefined : JSON.stringify(body)
    })

    if (ret.ok) return await ret.json()
    else return errorHandler()
  } catch (e) {
    console.log(e)
    return errorHandler()
  }
}

/**
 * jwt를 포함하지 않은 fetch
 * @param url 요청 URL
 * @param method 요청 메서드
 * @param body 요청 본문
 * @returns 응답 데이터 (any)
 */
export async function Request(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: any = {}
): Promise<any | null> {
  console.log("Request")
  try {
    const ret = await fetch(url, {
      method,
      headers: {
        accept: "*/*",
        "Content-Type": "application/json"
      },
      body: method === "GET" ? undefined : JSON.stringify(body)
    })

    if (ret.ok) return await ret.json()
    else return errorHandler()
  } catch (e) {
    return errorHandler()
  }
}

export async function errorHandler(): Promise<null> {
  await logout()
  return null
}