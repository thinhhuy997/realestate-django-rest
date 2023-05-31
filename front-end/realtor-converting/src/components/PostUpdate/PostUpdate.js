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
import IconLegal from "../Icons/IconLegal"
// NEW
// import "./Create"
import { faToilet, faBed, faEarthAsia } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "../../api/axios"
import { Link, useParams } from "react-router-dom"

function PostUpdate(props) {
  const params = useParams()
  const [data, setData] = useState({})
  let [userProfile, setUserProfile] = useState(() =>
    localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : null
  )

  const [formattedCash, setFormattedCash] = useState("")

  const titleRef = useRef()
  const errRef = useRef()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [region, setRegion] = useState("")
  const [imgFiles, setImgFiles] = useState([])
  const [donvi, setDonVi] = useState("tỷ")

  // for spec
  const [specDetailId, setSpecDetailId] = useState(null)
  const [area, setArea] = useState(0)
  const [matTien, setMatTien] = useState(0)
  const [price, setPrice] = useState(0)
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
    async function getPostById() {
      let response = await fetch(
        `http://127.0.0.1:8000/api/re-post2-retrieve-update-delete/${params.postid}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + String(authTokens.access),
          },
        }
      )
      let data = await response.json()
      console.log(data)
      setTitle(data.title)
      setDescription(data.description)
      setAddress(data.address)
      setPhone(data.phone)
      setRegion(data.region.region_name)
      // imageid

      // spec
      // NEW
      let spec_price_str = data.spec_detail.price.split(" ")
      // NEW
      setSpecDetailId(data.spec_detail.id)
      setArea(data.spec_detail.area)
      setPrice(spec_price_str[0])
      setDonVi(spec_price_str[1])
      setMatTien(data.spec_detail.mat_tien)
      setHuongNha(data.spec_detail.huong_nha)
      setDuongVao(data.spec_detail.duong_vao)
      setBedroomNumber(data.spec_detail.bedroom_number)
      setToiletNumber(data.spec_detail.toilet_number)
      setPhapLy(data.spec_detail.phap_ly)
    }

    getPostById()
  }, [])

  useEffect(() => {
    if (success) {
      Swal.fire(
        "Thành công!",
        "Bạn đã cập nhật bất động sản này thành công!",
        "success"
      )
    }
  }, [success])

  useEffect(() => {
    titleRef.current.focus()
  }, [])

  function handleChange(event) {
    setFormattedCash(parseInt(event.target.value).toLocaleString())
  }

  const handleChangeImages = (e) => {
    const imgFiles = []
    for (var i = 0; i < e.target.files.length; i++) {
      if ("jpg,png".includes(e.target.files[i].name.split(".").pop())) {
        imgFiles.push(e.target.files[i])
      }
    }
    setImgFiles(imgFiles)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("region", region)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("address", address)
    formData.append("phone", phone)
    // formData.append("images", imgFiles)
    formData.append("spec_detail_id", specDetailId)
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

    try {
      const response = await axios.put(
        `/api/re-post2-customize-update/${params.postid}/`,
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
                onChange={(e) => handleChangeImages(e)}
                disabled='disabled'
              />
            </FormGroup>
            {/* <Link to={imgFiles}>{imgFiles}</Link> */}
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
                  value={title}
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
                  value={description}
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
                placeholder='Địa chỉ liên hệ'
                value={address}
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
                  value={address}
                />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className='mb-3'>
              <Form.Label
                htmlFor='inputTitle'
                className='fs-4'
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
                  value={phone}
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
                      value={area}
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
                      value={matTien}
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
                      value={huongNha}
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
                      value={toiletNumber}
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
                      value={region}
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
                      value={price}
                      disabled={donvi === "Thỏa thuận"}
                    />
                    <select
                      className='form-select'
                      aria-label='triệu/m2'
                      onChange={(e) => setDonVi(e.target.value)}
                      value={donvi}
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
                      value={duongVao}
                    />
                    <InputGroup.Text>
                      m<sup></sup>
                    </InputGroup.Text>
                  </InputGroup>
                  <Form.Label>Đường vào</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text id='basic-addon1'>
                      <IconLegal />
                    </InputGroup.Text>
                    <select
                      className='form-select'
                      aria-label='Chọn loại giấy tờ'
                      onChange={(e) => setPhapLy(e.target.value)}
                      value={phapLy}
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
                      value={bedroomNumber}
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
                Cập nhật
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default PostUpdate
