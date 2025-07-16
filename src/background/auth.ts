import { Storage } from "@plasmohq/storage"
import { RaiseError } from "./service/log"
const storage = new Storage()

/**
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
    else return RaiseError(ret.statusText)
  } catch (e) {
    return RaiseError(e)
  }
}