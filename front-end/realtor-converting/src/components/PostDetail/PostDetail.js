import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Col, Container, Row } from "react-bootstrap"
import ControlledCarousel from "./CarouselController/ControlledCarousel"
import "./PostDetail.scss"
import IconArea from "../Icons/IconArea"
import IconWidthFacade from "../Icons/IconWidthFacade"
import IconDirection from "../Icons/IconDirection"
import IconCash from "../Icons/IconCash"
import IconWidthRoad from "../Icons/IconWidthRoad"
import IconLegal from "../Icons/IconLegal"
import IconFlag from "../Icons/IconFlag"
import IconBedroom from "../Icons/IconBedroom"
import IconToilet from "../Icons/IconToilet"
import CardSimilarPost from "./CardSimilarPost/CardSimilarPost"
import Swal from "sweetalert2"

// import axios from "axios";

function convertDescription(description) {
  const items = description.split("\n")
  return items
}

function PostDetail(props) {
  // const [data, setData] = useState();

  const params = useParams()

  const [reported, setReported] = useState(false)

  useEffect(() => {
    if (reported) {
    }
  }, [reported])

  const [data, setData] = useState({
    spec_detail: {
      id: 532,
      area: 233.0,
      price: "872 triệu",
      mat_tien: 8.0,
      huong_nha: "Bắc",
      duong_vao: 18.0,
      bedroom_number: 0,
      toilet_number: 0,
      phap_ly: "Sổ đỏ/ Sổ hồng",
    },
  })
  const [isBusy, setIsBusy] = useState(true)

  useEffect(() => {
    async function fetchAPI() {
      try {
        const apiUrl = `http://127.0.0.1:8000/api/re-post2-detail/${params.postid}/`
        let requestUrl = apiUrl
        const headers = {
          "Content-type": "application/json", // "X-CSRFToken": csrftoken,
        }
        const response = await fetch(requestUrl, { headers: headers })
        const responseJson = await response.json()
        setData(responseJson)
        setIsBusy(false)
      } catch (e) {
        console.log("Cannot fetch API response")
      }
    }

    fetchAPI()
  }, [])

  const [similar_posts, setSimilarPost] = useState([])

  useEffect(() => {
    const send_ids = data["similar_posts"]
    // delete send_ids["id"]
    const list_ids = []
    for (let key in send_ids) {
      if (key !== "id") {
        list_ids.push(send_ids[key])
      }
    }

    async function getSimilarIds() {
      try {
        const apiUrl = "http://127.0.0.1:8000/api/getRealestatePostsById/"
        let requestUrl = apiUrl
        const headers = {
          "Content-type": "application/json",
        }
        const response = await fetch(requestUrl, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ post_ids: list_ids }),
        })
        const responseJson = await response.json()
        console.log(responseJson)
        setSimilarPost(responseJson)
      } catch (e) {
        console.log("Cannot fetch API response")
      }
    }

    getSimilarIds()
  }, [isBusy])

  const [des, setDes] = useState("")

  useEffect(() => {
    try {
      setDes(convertDescription(data.description))
    } catch (e) {}
  }, [isBusy])

  async function handleReportClick() {
    console.log("reported")
    Swal.fire({
      title: "Bạn muốn report bài đăng này?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "Không",
      denyButtonText: `Vẫn báo cáo`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire("Bạn đã báo cáo thành công, bất động sản này sẽ được đưa vào danh sách xem xét!", "", "success")
        try {
          const apiUrl = `http://127.0.0.1:8000/api/re-post2-report-by-user/`
          let requestUrl = apiUrl
          console.log(requestUrl)
          const headers = {
            "Content-type": "application/json", // "X-CSRFToken": csrftoken,
          }
          const response = await fetch(requestUrl,{
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              "reported_item": params.postid
            })
          })
          console.log("Đã report! ", response)
          setReported(true)
        } catch (e) {
          console.log("Cannot fetch API response")
        }
      }
    })
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  const [contact, setContact] = useState("")

  function handleContactClick() {
    setContact(data["phone"])
  }

  return (
    <Container>
      {/*<div className='top-row mb-2'>this is post #{params.postid}</div>*/}
      <Row className='g-5 mb-5'>
        <Col lg={9} md={9}>
          <ControlledCarousel imgs={data.images} videos={data.videos}/>
          <article className='blog-post'>
            {/*Tiêu đề bài đăng*/}
            <h2 className='blog-post-title'>{data.title}</h2>
            {/*<p className="blog-post-meta">{created_at} bởi {created_by}</p>*/}
            <p>{data.address}</p>

            <hr />
            {/*Thông tin số liệu*/}
            <h4>Thông tin Mô tả</h4>
            <div>
              {des &&
                des.map((line) => {
                  return (
                    <div>
                      {line}
                      <br />
                    </div>
                  )
                })}
            </div>
            <hr />

            {/*Đặc điểm BDS*/}
            <h4>Đặc điểm bất động sản</h4>
            <Row className='table-info'>
              <Row>
                <Col lg={6}>
                  {data.spec_detail.area ? (
                    <Row>
                      <div className='icon col-1 text-center'>
                        <IconArea />
                      </div>
                      <Col lg={6} className='fw-bolder'>
                        Diện tích
                      </Col>
                      <Col lg={5} className='text-start'>
                        {data.spec_detail.area} m<sup>2</sup>
                      </Col>
                    </Row>
                  ) : (
                    <Row />
                  )}

                  {data.spec_detail.mat_tien ? (
                    <Row>
                      <div className='icon col-1 text-center'>
                        <IconWidthFacade />
                      </div>
                      <Col lg={6} className='fw-bolder'>
                        Mặt tiền
                      </Col>
                      <Col lg={5} className='text-start'>
                        {data.spec_detail.mat_tien} m
                      </Col>
                    </Row>
                  ) : (
                    <Row />
                  )}

                  {data.spec_detail.huong_nha ? (
                    <Row>
                      <div className='icon col-1 text-center'>
                        <IconDirection />
                      </div>
                      <Col lg={6} className='fw-bolder'>
                        Hướng nhà
                      </Col>
                      <Col lg={5} className='text-start'>
                        {data.spec_detail.huong_nha}
                      </Col>
                    </Row>
                  ) : (
                    <Row />
                  )}

                  {data.spec_detail.bedroom_number ? (
                    <Row>
                      <div className='icon col-1 text-center'>
                        <IconBedroom />
                      </div>
                      <Col lg={6} className='fw-bolder'>
                        Phòng ngủ
                      </Col>
                      <Col lg={5} className='text-start'>
                        {data.spec_detail.bedroom_number} phòng
                      </Col>
                    </Row>
                  ) : (
                    <Row />
                  )}
                </Col>

                <Col lg={6}>
                  {data.spec_detail.price ? (
                    <Row>
                      <div className='icon col-1 text-center'>
                        <IconCash />
                      </div>
                      <Col lg={6} className='fw-bolder'>
                        Giá
                      </Col>
                      <Col lg={5} className='text-start'>
                        {data.spec_detail.price}
                      </Col>
                    </Row>
                  ) : (
                    <Row />
                  )}

                  {data.spec_detail.duong_vao ? (
                    <Row>
                      <div className='icon col-1 text-center'>
                        <IconWidthRoad />
                      </div>
                      <Col lg={6} className='fw-bolder'>
                        Đường vào
                      </Col>
                      <Col lg={5} className='text-start'>
                        {data.spec_detail.duong_vao} m
                      </Col>
                    </Row>
                  ) : (
                    <Row />
                  )}

                  {data.spec_detail.phap_ly ? (
                    <Row>
                      <div className='icon col-1 text-center'>
                        <IconLegal />
                      </div>
                      <Col lg={6} className='fw-bolder'>
                        Pháp lý
                      </Col>
                      <Col lg={5} className='text-start'>
                        {/*{data.is_legal ? "Sổ đỏ/hồng" : "Khác"}*/}
                        {data.spec_detail.phap_ly}
                      </Col>
                    </Row>
                  ) : (
                    <Row />
                  )}

                  {data.spec_detail.toilet_number ? (
                    <Row>
                      <div className='icon col-1 text-center'>
                        <IconToilet />
                      </div>
                      <Col lg={6} className='fw-bolder'>
                        Toilet
                      </Col>
                      <Col lg={5} className='text-start'>
                        {data.spec_detail.toilet_number} phòng
                      </Col>
                    </Row>
                  ) : (
                    <Row />
                  )}
                </Col>
              </Row>
            </Row>

            <hr />
            {/*Thông tin bài post*/}
            <Row>
              <Col lg={3}>Ngày đăng</Col>
              <Col lg={3}>Ngày hết hạn</Col>
              <Col lg={3}>Loại tin</Col>
              <Col lg={3}>Mã tin</Col>
            </Row>
            <Row>
              <Col lg={3} className='fw-bolder'>
                28/04/2022
              </Col>
              <Col lg={3} className='fw-bolder'>
                28/04/2022
              </Col>
              <Col lg={3} className='fw-bolder'>
                Tin thường
              </Col>
              <Col lg={3} className='fw-bolder'>
                {data.id}
              </Col>
            </Row>

            {contact ? (
              <Button
                variant='outline-success mt-5'
                onClick={handleContactClick}
              >
                <span className='fw-bolder'>{contact}</span>
              </Button>
            ) : (
              <Button variant='success mt-5' onClick={handleContactClick}>
                <span className='fw-bolder'>Liên hệ ngay</span>
              </Button>
            )}

            {/*<Button variant='success mt-5'*/}
            {/*        onClick={handleContactClick}>*/}
            {/*    <span className='fw-bolder'>Liên hệ ngay</span>*/}
            {/*</Button>*/}

            <Button
              variant='outline-danger mt-5'
              className='float-end'
              onClick={handleReportClick}
            >
              <IconFlag />
              <span className='ms-3'>Báo cáo bài đăng</span>
            </Button>
            <hr />
            <h4>Bài viết liên quan</h4>
            <Row>
              {similar_posts.map((post) => (
                <Col lg={3} key={post.id}>
                  {" "}
                  <CardSimilarPost post={post} />{" "}
                </Col>
              ))}
            </Row>
          </article>
        </Col>
        {/*<Col lg={3} md={3}>*/}
        {/*    <CardSimilarPost></CardSimilarPost>*/}
        {/*</Col>*/}
      </Row>
    </Container>
  )
}

export default PostDetail
