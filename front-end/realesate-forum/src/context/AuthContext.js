import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  )

  let [userProfile, setUserProfile] = useState(() =>
    localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : null
  )

  const [category, setCategory] = useState("SELL")

  const navigate = useNavigate()

  let logoutUser = () => {
    setAuthTokens(null)
    setUserProfile(null)
    localStorage.removeItem("authTokens")
    localStorage.removeItem("userProfile")
    // navigate.push("/login-page")
  }

  let contextData = {
    userProfile: userProfile,
  }

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        setAuthTokens,
        userProfile,
        setUserProfile,
        navigate,
        logoutUser,
        category,
        setCategory,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
