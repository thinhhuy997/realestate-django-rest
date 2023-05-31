import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const Header = () => {
  let { userProfile, logoutUser } = useContext(AuthContext)

  return (
    <div>
      <Link to='/'>Home</Link>
      <span> | </span>
      {userProfile ? (
        <p onClick={logoutUser}>Logout</p>
      ) : (
        <Link to='/login-page'>Login</Link>
      )}

      <span> | </span>
      {userProfile && <p>Hello {userProfile.user_id}</p>}
    </div>
  )
}

export default Header
