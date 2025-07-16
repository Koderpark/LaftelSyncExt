import { Storage } from "@plasmohq/storage"
import type { Log } from "../type"
const storage = new Storage()

export const logModule = (() => {
  const get = async (): Promise<Log[]> => {
    return (await storage.get("log")) || []
  }

  const push = async (input: Log) => {
    const list = await get()
    list.push(input)
    await storage.set("log", list)

    setTimeout(async () => {
      const list = await get()
      list.shift()
      await storage.set("log", list)
    }, 3000)
  }

  return {
    push
  }
})()

export const DisplayLog = (msg: string) => {
  logModule.push({
    type: "success",
    message: msg,
    time: new Date()
  })
}

export const RaiseError = (msg: string) => {
  logModule.push({
    type: "error",
    message: msg,
    time: new Date()
  })

  //Todo: Logout & state reset
}