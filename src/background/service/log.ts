import { Storage } from "@plasmohq/storage"
import type { Log } from "../type"
const storage = new Storage()

export const logModule = (() => {
  const get = async (): Promise<Log[]> => {
    return (await storage.get("log")) || []
  }

  const set = async (input: Log[]) => {
    await storage.set("log", input)
  }

  const push = async (input: Log) => {
    const list = await get()
    list.push(input)
    await set(list)

    setTimeout(async () => {
      const list = await get()
      list.shift()
      await set(list)
    }, 2500)
  }

  const pushLog = async (msg: string) => {
    const list = await get()
    list.push({
      type: "success",
      message: msg,
      time: new Date()
    })
    await set(list)
  }

  const pushError = async (msg: string) => {
    const list = await get()
    list.push({
      type: "error",
      message: msg,
      time: new Date()
    })
    await set(list)
  }

  return {
    pushLog,
    pushError
  }
})()