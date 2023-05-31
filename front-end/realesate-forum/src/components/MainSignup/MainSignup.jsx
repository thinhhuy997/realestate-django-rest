import React, { useRef, useState, useEffect, Fragment } from "react"
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"
import axios from "./axios"
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = "/api/user-create/"

const MainSignup = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState("")
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pwd, setPwd] = useState("")
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState("")
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg("")
  }, [user, pwd, matchPwd])

  function getCookie(name) {
    let cookieValue = null
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";")
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry")
      return
    }
    try {
      const response = await axios.post(
        "/api/user-create/",
        JSON.stringify({ username: user, password: pwd, email: email }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )

      console.log(response?.data)
      console.log(response?.accessToken)
      console.log(JSON.stringify(response))
      setSuccess(true)
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("")
      setPwd("")
      setMatchPwd("")
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else if (err.response?.status === 400 && err.response.data.username) {
        setErrMsg(err.response.data.username)
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken")
      } else {
        setErrMsg("Registration Failed")
      }
      errRef.current.focus()
    }
  }

  return (
    <Fragment>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live='assertive'
        >
          {errMsg}
        </p>
      </section>

      {success ? (
        // <section>
        //   <h1>Success!</h1>
        //   <p>
        //     <a href='#'>Sign In</a>
        //   </p>
        // </section>

        <Navigate replace to='/login-page' />
      ) : (
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
                    Đăng ký để tham gia và chia sẽ thông tin BDS của bạn với mọi
                    người
                  </div>
                </a>
                <form class='form-default' onSubmit={handleSubmit}>
                  <div class='form-group'>
                    <label htmlFor='loginUserName'>
                      Tài khoản:
                      <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type='text'
                      id='username'
                      ref={userRef}
                      autoComplete='off'
                      onChange={(e) => setUser(e.target.value)}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby='uidnote'
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      // name='name'
                      class='form-control'
                      // id='loginUserName'
                      placeholder='taikhoan'
                    />
                  </div>
                  {/* open */}
                  <p
                    id='uidnote'
                    className={
                      userFocus && user && !validName
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />4 tới 24 kí tự.{" "}
                    <br />
                    Phải bắt đầu vói một trong các kí tự sau:
                    <br />
                    Chữ cái, số, gạch dưới, gạch nối.
                  </p>
                  {/* close */}
                  <div class='form-group'>
                    <label for='loginUserEmail'>
                      Email:
                      <span className={validEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={validEmail || !email ? "hide" : "invalid"}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type='text'
                      id='email'
                      autoComplete='off'
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby='uidnote'
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      name='name'
                      class='form-control'
                      // id='loginUserEmail'
                      placeholder='email@example.com'
                    />
                  </div>
                  {/* open */}
                  <p
                    id='confirmnote'
                    className={
                      emailFocus && email && !validEmail
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Email chưa hợp lệ.
                  </p>
                  {/* close */}
                  <div class='form-group'>
                    <label for='loginUserPassword'>
                      Mật khẩu:
                      <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type='password'
                      id='password'
                      onChange={(e) => setPwd(e.target.value)}
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby='pwdnote'
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      name='name'
                      class='form-control'
                      // id='loginUserPassword'
                      placeholder='************'
                    />
                  </div>
                  {/* open */}
                  <p
                    id='pwdnote'
                    className={
                      pwdFocus && !validPwd ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 tới 24 kí tự.
                    <br />
                    Phải bao gồm chữ hoa và chữ thường, một số và một ký tự đặc
                    biệt.
                    <br />
                    Các ký tự đặc biệt được phép:{" "}
                    <span aria-label='exclamation mark'>!</span>{" "}
                    <span aria-label='at symbol'>@</span>{" "}
                    <span aria-label='hashtag'>#</span>{" "}
                    <span aria-label='dollar sign'>$</span>{" "}
                    <span aria-label='percent'>%</span>
                  </p>
                  {/* close */}

                  <div class='form-group'>
                    <label for='loginUserPassword'>
                      Xác nhận mật khẩu:
                      <span
                        className={validMatch && matchPwd ? "valid" : "hide"}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={validMatch || !matchPwd ? "hide" : "invalid"}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type='password'
                      id='confirm_password'
                      onChange={(e) => setMatchPwd(e.target.value)}
                      required
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby='confirmnote'
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                      name='name'
                      class='form-control'
                      // id='loginUserPassword'
                      placeholder='************'
                    />
                  </div>
                  {/* open */}
                  <p
                    id='confirmnote'
                    className={
                      matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Phải trùng khớp với mật khẩu bên trên.
                  </p>
                  {/* close */}

                  <div class='form-group'>
                    <button
                      href='#'
                      type='submit'
                      className='btn btn-secondary btn-block'
                      disabled={
                        !validName || !validEmail || !validPwd || !validMatch
                          ? true
                          : false
                      }
                    >
                      Tạo tài khoản
                    </button>
                  </div>
                  <p>Hoặc đăng ký thông qua mạng xã hội</p>
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
                    Đã có tài khoản?{" "}
                    <a href='#' class='tt-underline'>
                      Đăng nhập ngay
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
      )}
    </Fragment>
  )
}

export default MainSignup
