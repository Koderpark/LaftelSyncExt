export type roomType = {
  id: number
  updatedAt: Date
  name: string
  password?: string
  vidTitle: string
  vidEpisode: string
  vidData: vidDataType
  owner: userType
  users: userType[]
}

export type vidDataType = {
  url: string
  speed: number
  time: number
  isPaused: boolean
}

export type userType = {
  id: number
  createdAt: Date
  name: string
  room?: roomType
  host?: roomType
}