import {Button, Container, Form, FormGroup} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import React, {useRef, useState, useEffect, Fragment} from "react"
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons"
import "./Signup.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Navigate} from "react-router-dom"
import axios from "../../api/axios"
import Swal from "sweetalert2"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
const REGISTER_URL = "/api/user-create/"

function SignUp() {
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

    const [phone, setPhone] = useState("")
    const [validPhone, setValidPhone] = useState(false)
    const [phoneFocus, setPhoneFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    const Swal = require('sweetalert2')

    useEffect(() => {
        if (success) {
            Swal.fire(
            'Thành công!',
            'Bạn đã tạo tài khoản thành công!',
            'success'
        )
        }
    }, [success])

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
        const result = PHONE_REGEX.test(phone)
        setValidPhone(result)
    }, [phone])

    useEffect(() => {
        setErrMsg("")
    }, [user, pwd, matchPwd])

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
                JSON.stringify({username: user, password: pwd, email: email}),
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
            console.log(err)
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

                <Navigate replace to='/signin'/>
            ) : (
                <Container>
                    <div style={{height: 60 + "em"}}></div>
                    <div className='position-absolute top-50 start-50 translate-middle'>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className='mb-3'>
                                <Form.Label htmlFor='inputUsername'>
                                    Tài khoản:{" "}
                                    <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                  </span>
                                    <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                  </span>
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    ref={userRef}
                                    placeholder='tài khoản'
                                    id='inputUsername'
                                    autoComplete='off'
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby='uidnote'
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                ></Form.Control>
                                {/* open */}
                                <p
                                    id='uidnote'
                                    className={
                                        userFocus && user && !validName
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/>4 tới 24 kí tự. <br/>
                                    Phải bắt đầu vói một trong các kí tự sau:
                                    <br/>
                                    Chữ cái, số, gạch dưới, gạch nối.
                                </p>
                                {/* close */}
                            </FormGroup>
                            <FormGroup className='mb-3'>
                                <Form.Label htmlFor='inputEmail'>
                                    Email:{" "}
                                    <span className={validEmail ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                  </span>
                                    <span className={validEmail || !email ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                  </span>
                                </Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Địa chỉ email'
                                    id='inputEmail'
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby='uidnote'
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    name='name'
                                ></Form.Control>
                                {/* open */}
                                <p
                                    id='confirmnote'
                                    className={
                                        emailFocus && email && !validEmail
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    Email chưa hợp lệ.
                                </p>
                                {/* close */}
                            </FormGroup>
                            <FormGroup className='mb-3'>
                                <Form.Label htmlFor='inputPassword'>
                                    Mật khẩu:{" "}
                                    <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                  </span>
                                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                  </span>
                                </Form.Label>
                                <Form.Control
                                    type='password'
                                    id='inputPassword'
                                    onChange={(e) => setPwd(e.target.value)}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby='pwdnote'
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    name='name'
                                ></Form.Control>
                                {/* open */}
                                <p
                                    id='pwdnote'
                                    className={
                                        pwdFocus && !validPwd ? "instructions" : "offscreen"
                                    }
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    8 tới 24 kí tự.
                                    <br/>
                                    Phải bao gồm chữ hoa và chữ thường, một số và một ký tự đặc
                                    biệt.
                                    <br/>
                                    Các ký tự đặc biệt được phép:{" "}
                                    <span aria-label='exclamation mark'>!</span>{" "}
                                    <span aria-label='at symbol'>@</span>{" "}
                                    <span aria-label='hashtag'>#</span>{" "}
                                    <span aria-label='dollar sign'>$</span>{" "}
                                    <span aria-label='percent'>%</span>
                                </p>
                                {/* close */}
                            </FormGroup>
                            <FormGroup className='mb-3'>
                                <Form.Label htmlFor='inputRePassword'>
                                    Xác nhận mật khẩu:{" "}
                                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                  </span>
                                    <span
                                        className={validMatch || !matchPwd ? "hide" : "invalid"}
                                    >
                    <FontAwesomeIcon icon={faTimes}/>
                  </span>
                                </Form.Label>
                                <Form.Control
                                    type='password'
                                    id='confirm_password'
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby='confirmnote'
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    name='name'
                                ></Form.Control>
                                {/* open */}
                                <p
                                    id='confirmnote'
                                    className={
                                        matchFocus && !validMatch ? "instructions" : "offscreen"
                                    }
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    Phải trùng khớp với mật khẩu bên trên.
                                </p>
                                {/* close */}
                            </FormGroup>
                            <FormGroup className='mb-3'>
                                <Form.Label htmlFor='inputNumberPhone'>
                                    Số điện thoại:{" "}
                                    <span className={validPhone ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                  </span>
                                    <span className={validPhone || !phone ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                  </span>
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    id='inputPhone'
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    aria-invalid={validPhone ? "false" : "true"}
                                    aria-describedby='phonenote'
                                    onFocus={() => setPhoneFocus(true)}
                                    onBlur={() => setPhoneFocus(false)}
                                ></Form.Control>
                                {/* open */}
                                <p
                                    id='uidnote'
                                    className={
                                        phoneFocus && phone && !validPhone
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    Số điện thoại phải có dạng: <br/>
                                    0xxxxxxxxx hoặc 84xxxxxxxx
                                </p>
                                {/* close */}
                            </FormGroup>
                            <FormGroup className='mb-3'>
                                <Form.Check
                                    type='checkbox'
                                    id='rememberLogin'
                                    label='Tôi đã đọc và chập nhận các điều khoản sử dụng'
                                ></Form.Check>
                            </FormGroup>
                            <Button variant='outline-primary' type='submit' className='w-100'>
                                Tạo tài khoản
                            </Button>
                        </Form>
                    </div>
                </Container>
            )}
        </Fragment>
    )
}

export default SignUp
