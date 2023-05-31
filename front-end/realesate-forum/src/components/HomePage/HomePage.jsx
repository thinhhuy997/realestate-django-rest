import React, { Fragment, useState, useEffect, useContext } from "react"

import Navbar from "../Navbar"
import Header from "../Header/Header"
import Header2 from "../Header2"
import Main from "../Main"
import Popup from "../Popup"
import PostCreate from "../PostCreate"
import ModalSearch from "../ModalSearch"
import AuthContext from "../../context/AuthContext"

const HomePage = () => {
  let { userProfile } = useContext(AuthContext)

  return (
    <div>
      <Navbar />
      {!userProfile ? <Header /> : <Header2 />}
      <Main />
      <Popup />
      <PostCreate />
      <ModalSearch />
    </div>
  )
}

export default HomePage
