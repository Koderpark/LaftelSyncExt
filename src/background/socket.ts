import io from "socket.io-client"

const socket = io("http://localhost:8081/", {
  transports: ["websocket"],
  reconnection: false,
  autoConnect: false
})

const shake = (jwt: string) => {
  socket.connect()
  socket.emit("auth", jwt)
}

socket.on("connect_error", (error) => {
  console.log(error)
})

export { socket, shake }
