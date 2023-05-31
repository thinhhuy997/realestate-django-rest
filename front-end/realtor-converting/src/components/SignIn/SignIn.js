import {Button, Container, Form, FormGroup} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import {useRef, useState, useEffect, useContext} from "react"
import jwt_decode from "jwt-decode"
import AuthContext from "../../context/AuthContext"
import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom"
import Swal from "sweetalert2";

function SignIn() {
    let {authTokens, setAuthTokens, userProfile, setUserProfile, navigate} =
        useContext(AuthContext)

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")
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
            body: JSON.stringify({username: user, password: pwd}),
        })
        let data = await response.json()
        if (response.status === 200) {
            let jwtData = jwt_decode(data.access)
            const username = await getUserName(jwtData.user_id)
            jwtData = await {...jwtData, username}
            setAuthTokens(data)
            setUserProfile(jwtData)
            localStorage.setItem("authTokens", JSON.stringify(data))
            localStorage.setItem("userProfile", JSON.stringify(jwtData))
            navigate("/buy")
            navigate(0)
            setSuccess(true)
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

    return (
        <Container className=''>
            <div style={{height: 60 + "em"}}></div>
            <div className='position-absolute top-50 start-50 translate-middle'>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className='mb-3'>
                        <Form.Label htmlFor='inputUsername'>Tài khoản:</Form.Label>
                        <Form.Control
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
                        ></Form.Control>
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <Form.Label htmlFor='inputPassword'>Mật khẩu:</Form.Label>
                        <Form.Control
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
                        ></Form.Control>
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <Form.Check
                            type='checkbox'
                            id='rememberLogin'
                            label='Ghi nhớ đăng nhập'
                        ></Form.Check>
                    </FormGroup>
                    <Button variant='outline-primary' type='submit' className='w-100'>
                        Đăng nhập
                    </Button>
                </Form>
            </div>
        </Container>
    )
}

export default SignIn
