import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Profile.scss"
import axios from "axios"
const Profile = () => {
  const [user, setUser] = useState(null)
  const [id, setId] = useState(() =>
    localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile")).user_id
      : null
  )
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [phone, setPhone] = useState(null)
  const [addressLine1, setAddressLine1] = useState(null)
  const [addressLine2, setAddressLine2] = useState(null)
  const [postCode, setPostCode] = useState(null)

  useEffect(() => {
    handleGetDetailUser()
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])

  const handleGetDetailUser = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get-extended-user-informartion/${id}/`
      )
      setUser(response.data)
      setFirstName(response.data["first_name"])
      setLastName(response.data["last_name"])
      setPhone(response.data["phone"])
      setAddressLine1(response.data["address_line1"])
      setAddressLine2(response.data["address_line2"])
      setPostCode(response.data["post_code"])
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateDetailUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/get-extended-user-informartion/${id}/`,
        {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          address_line1: addressLine1,
          address_line2: addressLine2,
          post_code: postCode,
        }
      )
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div class='container rounded bg-white mt-5 mb-5'>
      <div class='row'>
        <div class='col-md-5 border-right'>
          <div class='d-flex flex-column align-items-center text-center p-3 py-5'>
            <img
              class='rounded-circle mt-5'
              width='150px'
              src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
            />
            <span class='font-weight-bold'>Admin</span>
            <span class='text-black-50'>Tài khoản quản trị viên</span>
            <span> </span>
          </div>
        </div>
        <div class='col-md-7 border-right'>
          <div class='p-3 py-5'>
            <form onSubmit={handleUpdateDetailUser}>
              <div class='d-flex justify-content-between align-items-center mb-3'>
                <h4 class='text-right'>THÔNG TIN TÀI KHOẢN</h4>
              </div>
              <div className='row mt-2'>
                <div class='col-md-12'>
                  <label class='labels'>Tên tài khoản</label>
                  <input
                    type='text'
                    class='form-control'
                    placeholder=''
                    // value='Admin'
                    value={user?.username ? user.username : "-"}
                    disabled='disabled'
                  />
                </div>
              </div>
              <div class='row mt-2'>
                <div class='col-md-6'>
                  <label class='labels'>Tên</label>
                  <input
                    type='text'
                    class='form-control'
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder='Nhập tên'
                    value={firstName}
                  />
                </div>
                <div class='col-md-6'>
                  <label class='labels'>Họ và tên đệm</label>
                  <input
                    type='text'
                    class='form-control'
                    value={lastName}
                    placeholder='Nhập họ và tên đệm'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div class='row mt-3'>
                <div class='col-md-12'>
                  <label class='labels'>Số điện thoại</label>
                  <input
                    type='text'
                    class='form-control'
                    placeholder='Nhập số điện thoại'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div class='col-md-12'>
                  <label class='labels'>Địa chỉ liên hệ 1</label>
                  <input
                    type='text'
                    class='form-control'
                    placeholder='Nhập địa chỉ liện hệ 1'
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                  />
                </div>
                <div class='col-md-12'>
                  <label class='labels'>Địa chỉ liên hệ 2</label>
                  <input
                    type='text'
                    class='form-control'
                    placeholder='Nhập địa chỉ liện hệ 2'
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                  />
                </div>
                <div class='col-md-12'>
                  <label class='labels'>Ngày tham gia</label>
                  <input
                    type='text'
                    class='form-control'
                    placeholder=''
                    value={user?.date_joined ? user.date_joined : ""}
                    disabled='disabled'
                  />
                </div>
                <div class='col-md-12'>
                  <label class='labels'>Postcode</label>
                  <input
                    type='text'
                    class='form-control'
                    placeholder='Nhập postcode'
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                </div>
                <div class='col-md-12'>
                  <label class='labels'>Email</label>
                  <input
                    type='text'
                    class='form-control'
                    placeholder='Nhập email'
                    value={user?.email ? user.email : ""}
                    disabled='disabled'
                  />
                </div>
              </div>
              <div class='mt-5 text-center'>
                <button class='btn btn-primary profile-button' type='submit'>
                  LƯU THÔNG TIN
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <div class='col-md-4'>
          <div class='p-3 py-5'>
            <div class='d-flex justify-content-between align-items-center experience'>
              <span>Quản Lý BĐS:</span>
              <span class='border px-3 p-1 add-experience'>
                <i class='fa fa-plus'></i>&nbsp;Experience
              </span>
            </div>
            <br />
            <div class='col-md-12'>
              <label class='labels'>Experience in Designing</label>
              <input
                type='text'
                class='form-control'
                placeholder='experience'
                value=''
              />
            </div>{" "}
            <br />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Profile
