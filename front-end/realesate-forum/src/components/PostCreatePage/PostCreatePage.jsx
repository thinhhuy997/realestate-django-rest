import React, { Fragment, useContext } from "react"
import AuthContext from "../../context/AuthContext"

import Navbar from "../Navbar"
import Header from "../Header/Header"
import Header2 from "../Header2"
import MainCreatePost from "../MainCreatePost/MainCreatePost"

const PostCreatePage = () => {
  const { userProfile } = useContext(AuthContext)

  return (
    <Fragment>
      <Navbar />
      {/* Header2 is logged in */}
      {!userProfile ? <Header /> : <Header2 />}
      <MainCreatePost />
    </Fragment>
  )
}

export default PostCreatePage
