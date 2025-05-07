import { Storage } from "@plasmohq/storage"
import { logout } from "./auth"
import { clientAlert } from "./index"
import { authRequest } from "./auth"
const storage = new Storage()

export async function checkJWT(): Promise<boolean> {
  const ret = await authRequest("http://localhost:3000/auth/chkJWT", "GET")
  return ret
}

// storage.watch({
//   jwt: () => {
//     if (!checkJWT()) logout()
//   },
//   roomId: () => {
//     if (!checkRoom()) getRoomId()
//   }
// })