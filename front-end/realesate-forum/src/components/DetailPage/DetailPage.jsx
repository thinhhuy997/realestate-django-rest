import React, { useContext } from "react"
import Header from "../Header/Header"
import Header2 from "../Header2"
import Navbar from "../Navbar"
import AuthContext from "../../context/AuthContext"
import MainDetailPage from "./MainDetailPage"

const DetailPage = () => {
  let { userProfile } = useContext(AuthContext)
  return (
    <div>
      <Navbar />
      {!userProfile ? <Header /> : <Header2 />}
      <MainDetailPage />
    </div>
  )
}

export default DetailPage
