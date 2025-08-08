import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const getUrl = async () => {
  const isCanary = await storage.get("isCanary")

  if (isCanary) return process.env.PLASMO_PUBLIC_BE_CANARY!
  return process.env.PLASMO_PUBLIC_BE_PUBLIC!
}

export interface Room {
  id: number
  updatedAt: Date
  name: string
  password?: string
  vidTitle: string
  vidEpisode: string
  vidData: VidData
  host: User
  users: User[]
}

export interface VidData {
  url: string
  speed: number
  time: number
  isPaused: boolean
}

export interface User {
  id: number
  createdAt: Date
  name: string
  room?: Room
  host?: Room
}

export interface Log {
  type: "success" | "error"
  message: string
  time: Date
}

export interface RoomMetadata {
  id: number
  name: string
  host: string
  user: {
    id: string
    name: string
    isHost: boolean
  }[]
}

export type Page = "login" | "main" | "room" | "setting" | "chat"
