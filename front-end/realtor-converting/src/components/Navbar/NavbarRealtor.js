import React, { useMemo, useContext } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap"
import "./NavbarRealtor.scss"
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"
import SignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"
import ErrorPage from "../Error/ErrorPage"
import Home from "../HomePage/Home"
import BuyHome from "../Buy/BuyHome"
import PostDetail from "../PostDetail/PostDetail"
import CreatePost from "../CreatePost/CreatePost"
import { useEffect, useState } from "react"
import CardPost from "../CardPost/CardPost"
import AuthContext, { AuthProvider } from "../../context/AuthContext"
// new
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Profile from "../Profile/Profile"
import RealestateManage from "../RealestateManage/RealestateManage"
import PostUpdate from "../PostUpdate/PostUpdate"
// new

function NavbarRealtor(props) {
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false)
  let [userProfile, setUserProfile] = useState(() =>
    localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : null
  )
  const [show, setShow] = useState(false)
  // const history = useHistory()

  let logoutUser = () => {
    setUserProfile(null)
    localStorage.removeItem("authTokens")
    localStorage.removeItem("userProfile")
  }

  useEffect(() => {
    console.log(userProfile)
  }, [userProfile])

  useEffect(() => {}, [])
  return (
    <BrowserRouter>
      <div className='top-bar w-100 border-bottom'>
        <Navbar bg='light' expand='lg'>
          <Container className='fw-bold'>
            <Navbar.Brand href='/buy'>DACNTT2 - Lâm Đồng BĐS</Navbar.Brand>
            <Navbar.Toggle aria-controls='sell-nav-dropdown' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'></Nav>
              <Nav className='justify-content-end'>
                <Nav.Link
                  onMouseEnter={() => setIsFavoriteHovered(true)}
                  onMouseLeave={() => setIsFavoriteHovered(false)}
                >
                  {isFavoriteHovered ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      fill='#fa2062'
                      className='bi bi-heart-fill'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      fill='currentColor'
                      className='bi bi-heart'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='red'
                        d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'
                      />
                    </svg>
                  )}
                </Nav.Link>
                {/* new */}
                {userProfile && (
                  <Nav.Link href='#' className='hover-underline-animation'>
                    {userProfile?.username}
                  </Nav.Link>
                )}
                {/* new */}
                {userProfile && (
                  <>
                    <Nav.Link
                      href='/create'
                      className='hover-underline-animation'
                    >
                      Đăng tin
                    </Nav.Link>
                    {/* new */}
                    <Nav className='me-auto'>
                      <NavDropdown
                        title={
                          <FontAwesomeIcon
                            icon={faGear}
                            style={{ width: "25px", height: "25px" }}
                          />
                        }
                        id='sell-nav-dropdown'
                        className='hover-underline-animation'
                        href='#Bán'
                      >
                        <NavDropdown.Item href="/profiles">Quản lý tài khoản
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/manages">Quản lý BĐS của bạn
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={logoutUser}>
                          Đăng xuất
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                    {/* new */}
                  </>
                )}

                {userProfile ? (
                  <div></div>
                ) : (
                  <Nav.Link
                    href='/signin'
                    className='hover-underline-animation'
                  >
                    Đăng nhập
                  </Nav.Link>
                )}

                {userProfile ? (
                  <div></div>
                ) : (
                  <Nav.Link
                    href='/signup'
                    className='hover-underline-animation'
                  >
                    Đăng kí
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <AuthProvider>
        <Routes>
          {/*<Route path='/home' element={<Home />}></Route>*/}
          <Route path='/buy' element={<BuyHome />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/detail/:postid' element={<PostDetail />}></Route>
          <Route path='/create' element={<CreatePost />}></Route>
          <Route path='' element={<BuyHome />}></Route>
          {/*-----------------------------------------------*/}
          <Route path='*' element={<ErrorPage />}></Route>
          {/* new */}
          <Route path='/profiles' element={<Profile />}></Route>
          <Route path='/manages' element={<RealestateManage />}></Route>
          <Route path='/update/:postid' element={<PostUpdate />}></Route>
          {/* new */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default NavbarRealtor
