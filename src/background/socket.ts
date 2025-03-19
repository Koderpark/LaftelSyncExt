import io from "socket.io-client"

const socket = io("http://localhost:8081/", {
  transports: ["websocket"],
  reconnection: false
})

socket.on("connect_error", (error) => {
  console.log(error)
})

export { socket }
