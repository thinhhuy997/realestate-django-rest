import { useRef, useState, useEffect, useContext } from "react"
import AuthContext from "../../context/AuthContext"
import jwt_decode from "jwt-decode"

import axios from "../../api/axios"
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"

const LOGIN_URL = "/api/login/"

const MainLogin = () => {
  let { authTokens, setAuthTokens, userProfile, setUserProfile, navigate } =
    useContext(AuthContext)

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState("")
  const [pwd, setPwd] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form submitted")
    let response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user, password: pwd }),
    })
    let data = await response.json()
    if (response.status === 200) {
      let jwtData = jwt_decode(data.access)
      const username = await getUserName(jwtData.user_id)
      jwtData = await { ...jwtData, username }
      setAuthTokens(data)
      setUserProfile(jwtData)
      localStorage.setItem("authTokens", JSON.stringify(data))
      localStorage.setItem("userProfile", JSON.stringify(jwtData))
      navigate("/")
    } else {
      alert("Something went wrong!")
    }
  }

  const getUserName = async (user_id) => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/user-detail/${user_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + String(authTokens.access),
        },
      }
    )
    let data = await response.json()

    const username = data["username"]

    return username
  }

  // useEffect(() => {
  //   console.log("authtoken")
  //   console.log(authTokens)
  // }, [])

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href='/admin-page'>Go to Admin Page</a>
          </p>
        </section>
      ) : (
        <>
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live='assertive'
            >
              {errMsg}
            </p>
          </section>

          <main id='tt-pageContent' class='tt-offset-none'>
            <div class='container'>
              <div class='tt-loginpages-wrapper'>
                <div class='tt-loginpages'>
                  <a href='/' class='tt-block-title'>
                    <img src='images/logo.png' alt='' />
                    <div class='tt-title'>
                      Chào mừng bạn đến với Forum BDS Lâm Đồng
                    </div>
                    <div class='tt-description'>
                      Đăng nhập để chia sẽ thông tin BDS của bạn với mọi người
                    </div>
                  </a>
                  <form class='form-default' onSubmit={handleSubmit}>
                    <div class='form-group'>
                      <label for='loginUserName'>Tài khoản</label>
                      <input
                        type='text'
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        name='name'
                        required
                        class='form-control'
                        // id='loginUserName'
                        placeholder='tài khoản'
                      />
                    </div>
                    <div class='form-group'>
                      <label for='loginUserPassword'>Mật khẩu</label>
                      <input
                        type='password'
                        id='password'
                        onChange={(e) => {
                          setPwd(e.target.value)
                        }}
                        value={pwd}
                        required
                        name='name'
                        class='form-control'
                        // id='loginUserPassword'
                        placeholder='************'
                      />
                    </div>
                    <div class='row'>
                      <div class='col'>
                        <div class='form-group'>
                          <div class='checkbox-group'>
                            <input
                              type='checkbox'
                              id='settingsCheckBox01'
                              name='checkbox'
                            />
                            <label for='settingsCheckBox01'>
                              <span class='check'></span>
                              <span class='box'></span>
                              <span class='tt-text'>Ghi nhớ</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class='col ml-auto text-right'>
                        <a href='#' class='tt-underline'>
                          Quên mật khẩu
                        </a>
                      </div>
                    </div>
                    <div class='form-group'>
                      <button
                        href='#'
                        type='submit'
                        className='btn btn-secondary btn-block'
                      >
                        Đăng nhập
                      </button>
                    </div>

                    <p>Hoặc đăng nhập qua mạng xã hội</p>
                    <div class='row'>
                      <div class='col'>
                        <div class='form-group'>
                          <a
                            href='#'
                            class='btn btn-color01 btn-secondary btn-block'
                          >
                            <i>
                              <svg class='icon'>
                                <use xlinkHref='#facebook-f-brands'></use>
                              </svg>
                            </i>
                            Facebook
                          </a>
                        </div>
                      </div>
                      <div class='col'>
                        <div class='form-group'>
                          <a href='#' class='btn btn-color02 btn-block'>
                            <i>
                              <svg class='icon'>
                                <use xlinkHref='#twitter-brands'></use>
                              </svg>
                            </i>
                            Twitter
                          </a>
                        </div>
                      </div>
                    </div>
                    <p>
                      Chưa có tài khoản{" "}
                      <a href='#' class='tt-underline'>
                        Đăng ký ngay
                      </a>
                    </p>
                    <div class='tt-notes'>
                      Đăng nhập và đăng ký sẽ phải tuân thủ điều khoản của diễn
                      đàn. <br />
                      <a href='#' class='tt-underline'>
                        Điều khoản sử dụng
                      </a>{" "}
                      và{" "}
                      <a href='#' class='tt-underline'>
                        Chính sách bảo mật.
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  )
}

export default MainLogin
