import { Storage } from "@plasmohq/storage"
const storage = new Storage()

export const userModule = (() => {
  const get = async () => {
    return await storage.get("user")
  }

  return {
    get
  }
})()
