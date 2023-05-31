import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth()

  const refresh = async () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"))

    const response = await axios.post(
      "/api/refresh-token/",
      JSON.stringify({
        refresh: jwt.refreshToken,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    // const response = await axios.get("/api/refresh-token/", {
    //   withCredentials: true,
    // })
    // console.log("---------")
    // console.log(response.data.access)
    setAuth((prev) => {
      console.log("----------------------------------")
      console.log(JSON.stringify(prev))
      console.log(response.data.access)
      return { ...prev, accessToken: response.data.access }
    })
    return response.data.accessToken
  }

  return refresh
}

export default useRefreshToken
