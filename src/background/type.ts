export interface Room {
  id: number
  updatedAt: Date
  name: string
  password?: string
  vidTitle: string
  vidEpisode: string
  vidData: VidData
  owner: User
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
