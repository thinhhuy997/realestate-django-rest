import "./App.scss"
import {} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from "react"
import NavbarRealtor from "./Navbar/NavbarRealtor"
import FooterRealtor from "./Footer/FooterRealtor"
import AuthProvider from "../context/AuthContext"

function App() {
  return (
    <>
      <NavbarRealtor></NavbarRealtor>
      <FooterRealtor></FooterRealtor>
    </>
  )
}

export default App
