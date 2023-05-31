import React, { useState, useEffect, useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap"
import IconArea from "../Icons/IconArea"
import IconWidthFacade from "../Icons/IconWidthFacade"
import IconDirection from "../Icons/IconDirection"
import IconCash from "../Icons/IconCash"
import IconWidthRoad from "../Icons/IconWidthRoad"
// NEW
// import "./Create"
import { faToilet, faBed, faEarthAsia } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "../../api/axios"
import Swal from "sweetalert2"

function CreatePost(props) {
  const [formattedCash, setFormattedCash] = useState("")
  let [userProfile, setUserProfile] = useState(() =>
    localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : null
  )
  const titleRef = useRef()
  const errRef = useRef()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [region, setRegion] = useState("")
  const [imgFiles, setImgFiles] = useState([])
  const [videoFiles, setVideoFiles] = useState([])

  // for spec
  const [area, setArea] = useState(0)
  const [matTien, setMatTien] = useState(0)
  const [price, setPrice] = useState(0)
  const [donvi, setDonVi] = useState("tỷ")
  const [huongNha, setHuongNha] = useState("")
  const [duongVao, setDuongVao] = useState("")
  const [bedroomNumber, setBedroomNumber] = useState(0)
  const [toiletNumber, setToiletNumber] = useState(0)
  const [phapLy, setPhapLy] = useState("")

  // for Checker
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  const Swal = require("sweetalert2")

  useEffect(() => {
    if (success) {
      Swal.fire(
        "Thành công!",
        "Bạn đã đăng bất động sản thành công!",
        "success"
      )
    }
  }, [success])

  // useEffect(() => {
  //   console.log("title", title)
  // }, [title])
  // useEffect(() => {
  //   console.log("description", description)
  // }, [description])
  // useEffect(() => {
  //   console.log("region", region)
  // }, [region])
  // useEffect(() => {
  //   console.log("imgFiles", imgFiles)
  // }, [imgFiles])
  // useEffect(() => {
  //   console.log("area", area)
  // }, [area])
  // useEffect(() => {
  //   console.log("matTien", matTien)
  // }, [matTien])
  // useEffect(() => {
  //   console.log("price", price)
  // }, [price])
  // useEffect(() => {
  //   console.log("price", price)
  // }, [price])
  // useEffect(() => {
  //   console.log("huongNha", huongNha)
  // }, [huongNha])
  // useEffect(() => {
  //   console.log("duongVao", duongVao)
  // }, [duongVao])
  // useEffect(() => {
  //   console.log("bedroomNumber", bedroomNumber)
  // }, [bedroomNumber])
  // useEffect(() => {
  //   console.log("toiletNumber", toiletNumber)
  // }, [toiletNumber])
  // useEffect(() => {
  //   console.log("phapLy", phapLy)
  // }, [phapLy])

  useEffect(() => {
    console.log(price + " " + donvi)
  }, [price, donvi])

  useEffect(() => {
    titleRef.current.focus()
  }, [])

  function handleChange(event) {
    setFormattedCash(parseInt(event.target.value).toLocaleString())
  }

  const handleChangeFiles = (e) => {
    const imgFiles = []
    const videoFiles = []
    for (var i = 0; i < e.target.files.length; i++) {
      if ("jpg,png".includes(e.target.files[i].name.split(".").pop())) {
        imgFiles.push(e.target.files[i])
      }
      if ("mp4".includes(e.target.files[i].name.split(".").pop())) {
        videoFiles.push(e.target.files[i])
      }
    }
    setImgFiles(imgFiles)
    setVideoFiles(videoFiles)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("created_by", userProfile["username"])
    formData.append("region", region)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("address", address)
    formData.append("phone", phone)

    formData.append("area", area)
    formData.append("mat_tien", matTien)
    formData.append("price", price.toString() + " " + donvi)
    formData.append("huong_nha", huongNha)
    formData.append("duong_vao", duongVao)
    formData.append("bedroom_number", bedroomNumber)
    formData.append("toilet_number", toiletNumber)
    formData.append("phap_ly", phapLy)

    {
      imgFiles[0] &&
        imgFiles.map((imgFile, id) =>
          formData.append(`image_${parseInt(id) + 1}`, imgFile)
        )
    }

    {
      videoFiles[0] &&
        videoFiles.map((videoFile, id) =>
          formData.append(`video_${parseInt(id) + 1}`, videoFile)
        )
    }

    try {
      const response = await axios.post(
        "/api/re-post2-customize-create/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      console.log(response)

      setSuccess(true)
      // setTitle("")
      // setDescription("")
      // setImgFiles([])
      // setAddress("")
      // setPhone("")
      // setRegion("")
    } catch (err) {
      console.log(err)
      console.log(formData)
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else {
        setErrMsg("Post Failed")
      }
      // errRef.current.focus()
    }
  }

  return (
    <Container className='mb-5'>
      <Row className='mt-5'>
        <Col lg={8}>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup className='mb-3'>
              <Form.Label htmlFor='inputMultipleImages'>Chọn ảnh</Form.Label>
              <Form.Control
                type='file'
                id='inputMultipleImages'
                multiple='multiple'
                onChange={(e) => handleChangeFiles(e)}
              />
            </FormGroup>
            {/* {imgFiles[0] && (
              <div>
                <p>
                  {imgFiles.map((imgFile, id) => (
                    <span key={id}>{imgFile.name}, </span>
                  ))}
                </p>
              </div>
            )} */}
            <FormGroup className='mb-3'>
              <Form.Label
                htmlFor='inputTitle'
                className='fs-4'
                ref={titleRef}
                id='inputTopicTitle'
                placeholder='Tiều đề bài viết của bạn'
              >
                Tiêu đề
              </Form.Label>
              <FloatingLabel
                controlId='inputTitle'
                label='Tiêu đề bài đăng'
                className='mb-3'
              >
                <Form.Control
                  type='text'
                  placeholder='name@example.com'
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className='mb-3'>
              <Form.Label htmlFor='inputDescription' className='fs-4' required>
                Mô tả
              </Form.Label>
              <FloatingLabel
                controlId='inputDescription'
                label='Mô tả ngắn về BĐS'
              >
                <Form.Control
                  as='textarea'
                  type='text'
                  placeholder='Leave a comment here'
                  style={{ height: "100px" }}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                  required
                />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className='mb-3'>
              <Form.Label
                htmlFor='inputTitle'
                className='fs-4'
                ref={titleRef}
                id='inputTopicTitle'
                placeholder='Tiều đề bài viết của bạn'
              >
                Địa chỉ
              </Form.Label>
              <FloatingLabel
                controlId='inputTitle'
                label='Địa chỉ của BĐS'
                className='mb-3'
              >
                <Form.Control
                  type='text'
                  placeholder='name@example.com'
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className='mb-3'>
              <Form.Label
                htmlFor='inputTitle'
                className='fs-4'
                ref={titleRef}
                id='inputPhoneContact'
                placeholder='Số điện thoại liên hệ của bạn.'
              >
                SĐT liên hệ
              </Form.Label>
              <FloatingLabel
                controlId='inputTitle'
                label='SĐT của bạn'
                className='mb-3'
              >
                <Form.Control
                  type='text'
                  placeholder='name@example.com'
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FloatingLabel>
            </FormGroup>
            <FormGroup>
              <Row>
                <Form.Label htmlFor='inputTitle' className='fs-4'>
                  Đặc điểm
                </Form.Label>
                <Col lg={6}>
                  <Form.Label>Diện tích</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text id='basic-addon1'>
                      <IconArea />
                    </InputGroup.Text>
                    <FormControl
                      placeholder=''
                      aria-label='Username'
                      aria-describedby='basic-addon1'
                      type='number'
                      onChange={(e) => {
                        setArea(e.target.value)
                      }}
                    />
                    <InputGroup.Text>
                      m<sup>2</sup>
                    </InputGroup.Text>
                    {/*<FormControl disabled aria-label="Last name" />*/}
                  </InputGroup>
                  <Form.Label>Mặt tiền</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text id='basic-addon1'>
                      <IconWidthFacade />
                    </InputGroup.Text>
                    <FormControl
                      placeholder=''
                      aria-label='Username'
                      type='number'
                      aria-describedby='basic-addon1'
                      onChange={(e) => {
                        setMatTien(e.target.value)
                      }}
                    />
                    <InputGroup.Text>
                      m<sup></sup>
                    </InputGroup.Text>
                  </InputGroup>
                  <Form.Label>Hướng nhà</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text id='basic-addon1'>
                      <IconDirection />
                    </InputGroup.Text>
                    <select
                      className='form-select'
                      aria-label='Chọn hướng nhà'
                      onChange={(e) => setHuongNha(e.target.value)}
                    >
                      <option value=''>Chọn hướng nhà</option>
                      <option value='Bắc'>Bắc</option>
                      <option value='Đông - Bắc'>Đông - Bắc</option>
                      <option value='Đông'>Đông</option>
                      <option value='Đông - Nam'>Đông - Nam</option>
                      <option value='Nam'>Nam</option>
                      <option value='Tây - Nam'>Tây - Nam</option>
                      <option value='Tây'>Tây</option>
                      <option value='Tây - Bắc'>Tây - Bắc</option>
                    </select>
                  </InputGroup>
                  <Form.Label>Số lượng toilet</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text id='basic-addon1'>
                      <FontAwesomeIcon
                        icon={faToilet}
                        style={{ width: "16px", height: "16px" }}
                      />
                    </InputGroup.Text>
                    <select
                      className='form-select'
                      aria-label='Số toilet'
                      onChange={(e) => setToiletNumber(e.target.value)}
                    >
                      <option value='0'>Số toilet</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                      <option value='9'>9</option>
                      <option value='10'>10</option>
                    </select>
                  </InputGroup>
                  <Form.Label>Khu vực</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text id='basic-addon1'>
                      <FontAwesomeIcon
                        icon={faEarthAsia}
                        style={{ width: "16px", height: "16px" }}
                      />
                    </InputGroup.Text>
                    <select
                      className='form-select'
                      aria-label='Số toilet'
                      required
                      onChange={(e) => setRegion(e.target.value)}
                    >
                      <option value=''>Chọn Khu vực</option>
                      <option value='Bảo Lộc'>Bảo Lộc</option>
                      <option value='Đà Lạt'>Đà Lạt</option>
                      <option value='Bảo Lâm'>Bảo Lâm</option>
                      <option value='Lâm Hà'>Lâm Hà</option>
                      <option value='Cát Tiên'>Cát Tiên</option>
                      <option value='Đức Trọng'>Đức Trọng</option>
                      <option value='Lâm Hà'>Lâm Hà</option>
                      <option value='Đạ Tẻh'>Đạ Tẻh</option>
                      <option value='Lạc Dương'>Lạc Dương</option>
                      <option value='Đạ Huoai'>Đạ Huoai</option>
                      <option value='Di Linh'>Di Linh</option>
                    </select>
                  </InputGroup>
                </Col>
                <Col lg={6}>
                  <Form.Label>Giá tiền</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text id='basic-addon1'>
                      <IconCash />
                    </InputGroup.Text>
                    <FormControl
                      placeholder=''
                      aria-label='Username'
                      aria-describedby='basic-addon1'
                      onInput={handleChange}
                      type='number'
                      onChange={(e) => setPrice(e.target.value)}
                      disabled={donvi === "Thỏa thuận"}
                    />
                    <select
                      className='form-select'
                      aria-label='triệu/m2'
                      onChange={(e) => setDonVi(e.target.value)}
                    >
                      <option value='tỷ'>tỷ</option>
                      <option value='triệu'>triệu</option>
                      <option value='tỷ/m2'>
                        tỷ/m<sup>2</sup>
                      </option>
                      <option value='triệu/m2'>
                        triệu/m<sup>2</sup>
                      </option>
                      <option value='nghìn/m2'>
                        nghìn/m<sup>2</sup>
                      </option>
                      <option value='Thỏa thuận'>Thỏa thuận</option>
                    </select>
                  </InputGroup>
                  <Form.Label>Đường vào</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text id='basic-addon1'>
                      <IconWidthRoad />
                    </InputGroup.Text>
                    <FormControl
                      placeholder=''
                      aria-label='Username'
                      aria-describedby='basic-addon1'
                      type='number'
                      onChange={(e) => setDuongVao(e.target.value)}
                    />
                    <InputGroup.Text>
                      m<sup></sup>
                    </InputGroup.Text>
                  </InputGroup>
                  <Form.Label>Pháp lý</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text id='basic-addon1'>
                      <IconDirection />
                    </InputGroup.Text>
                    <select
                      className='form-select'
                      aria-label='Chọn loại giấy tờ'
                      onChange={(e) => setPhapLy(e.target.value)}
                    >
                      <option value=''>Chọn loại giấy tờ</option>
                      <option value='Sổ đỏ/ sổ hồng'>Sổ đỏ/ sổ hồng</option>
                      <option value='Sổ hồng'>Sổ đỏ</option>
                      <option value='Sổ đỏ'>Sổ hồng</option>
                      <option value='Giấy tờ tay'>Giấy tờ tay</option>
                    </select>
                  </InputGroup>
                  <Form.Label>Số lượng phòng ngủ</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text id='basic-addon1'>
                      <FontAwesomeIcon
                        icon={faBed}
                        style={{ width: "16px", height: "16px" }}
                      />
                    </InputGroup.Text>
                    <select
                      className='form-select'
                      aria-label='Số phòng ngủ'
                      onChange={(e) => setBedroomNumber(e.target.value)}
                    >
                      <option value='0'>Số phòng ngủ</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                      <option value='9'>9</option>
                      <option value='10'>10</option>
                    </select>
                  </InputGroup>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Form.Check
                type='checkbox'
                id='checkboxAgreements'
                label='Tôi đã đọc và chập nhận các điều khoản sử dụng'
                required
              />
              <Button variant='outline-primary' type='submit' className='w-100'>
                Đăng tin
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CreatePost
