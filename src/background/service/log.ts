import { Storage } from "@plasmohq/storage"
import type { Log } from "../const"
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
    await push({
      type: "success",
      message: msg,
      time: new Date()
    })
  }

  const pushError = async (msg: string) => {
    await push({
      type: "error",
      message: msg,
      time: new Date()
    })
  }

  return {
    push,
    pushLog,
    pushError
  }
})()