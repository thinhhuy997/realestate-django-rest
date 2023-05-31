import React, { useState, useEffect } from "react"
import "./RealestateManage.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import ReactPaginate from "react-paginate"
import JsonData from "./MOCK_DATA.json"
import axios from "axios"
import { faWrench, faTrash, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

const PER_PAGE = 1

const RealestateManage = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [posts, setPosts] = useState([])
  const [postCount, setPostCount] = useState(0)
  const [reported, setReported] = useState(false)

  let [userProfile, setUserProfile] = useState(() =>
    localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : null
  )

  const postsPerPage = 10
  const pagesVisited = pageNumber * postsPerPage

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:8000/api/get-realestate-by-user-id/${userProfile.user_id}/`,
    })
      .then((res) => {
        setPosts(res.data)
        setPostCount(posts.length)
      })
      .catch((e) => console.dir(e))
  }, [postCount])

  const displayPosts = posts
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((post) => {
      return (
        <div class='job-box d-md-flex align-items-center justify-content-between mb-30'>
          <div class='job-left my-4 d-md-flex align-items-center flex-wrap'>
            <div class='img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex'>
              FD
            </div>
            <div class='job-content'>
              <h5 class='text-md-left post-title'>{post.title}</h5>
              <ul class='d-md-flex flex-wrap text-capitalize ff-open-sans'>
                <li class='mr-md-4'>
                  <i class='zmdi zmdi-pin mr-2'></i> {post.address}
                </li>
                <li class='ms-4'>
                  <i class='zmdi zmdi-money-box mr-2'></i> {post.total_price} tỷ
                </li>
                <li class='ms-4'>
                  <i class='zmdi zmdi-time mr-2'></i> {post.created_at}
                </li>
              </ul>
            </div>
          </div>
          <div class='job-right my-4 flex-shrink-0'>
            <Link
              to={`/detail/${post.id}`}
              className='btn d-block w-100 d-sm-inline-block btn-light my-2'
            >
              <FontAwesomeIcon
                icon={faEye}
                style={{ width: "16px", height: "16px" }}
              />
            </Link>
            <Link
              to={`/update/${post.id}`}
              className='btn d-block w-100 d-sm-inline-block btn-light my-2'
            >
              <FontAwesomeIcon
                icon={faWrench}
                style={{ width: "16px", height: "16px" }}
              />
            </Link>
            <button
              class='btn d-block w-100 d-sm-inline-block btn-light my-2'
              onClick={() => handleRemoveClick(post.id)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                style={{ width: "16px", height: "16px" }}
              />
            </button>
          </div>
        </div>
      )
    })

  const pageCount = Math.ceil(posts.length / postsPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  async function handleRemoveClick(id) {
    console.log(id)
    console.log("reported")
    Swal.fire({
      title: "Bạn có chắc muốn xóa bất động sản này?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "Không",
      denyButtonText: `Xóa`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success")
      } else if (result.isDenied) {
        Swal.fire("Bạn đã xóa bất động sản này thành công!", "", "success")
        try {
          const apiUrl = `http://127.0.0.1:8000/api/re-post2-retrieve-update-delete/${id}/`
          let requestUrl = apiUrl
          console.log(requestUrl)
          const headers = {
            "Content-type": "application/json", // "X-CSRFToken": csrftoken,
          }
          const response = await fetch(requestUrl, {
            method: "DELETE",
            headers: headers,
          })
          console.log("Đã report! ", response)
          setReported(true)
          setPostCount(posts.length - 1)
        } catch (e) {
          console.log("Cannot fetch API response")
        }
      }
    })
  }

  return (
    <>
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css'
        integrity='sha256-3sPp8BkKUE7QyPSl6VfBByBroQbKxKG7tsusY2mhbVY='
        crossorigin='anonymous'
      />

      <div class='container'>
        <div class='row'>
          <div class='col-lg-10 mx-auto mb-4'>
            <div class='section-title text-center '>
              <h3 class='top-c-sep'>Danh sách Bất Động Sản của bạn:</h3>
              <p>
                Bạn có thể cập nhật thông tin hoặc xóa BĐS mà bạn đang quản lý.
              </p>
            </div>
          </div>
        </div>

        <div class='row'>
          <div class='col-lg-10 mx-auto'>
            <div class='career-search mb-60'>
              <form action='#' class='career-form mb-60'>
                <div class='row'>
                  <div class='col-md-6 col-lg-3 my-3'>
                    <div class='input-group position-relative'>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Nhập thông tin'
                        id='keywords'
                      />
                    </div>
                  </div>
                  <div class='col-md-6 col-lg-3 my-3'>
                    <div class='select-container'>
                      <select class='custom-select'>
                        <option selected=''>Chọn Khu vực</option>
                        <option value='1'>Bảo Lộc</option>
                        <option value='2'>Đà Lạt</option>
                        <option value='3'>Bảo Lâm</option>
                      </select>
                    </div>
                  </div>
                  <div class='col-md-6 col-lg-3 my-3'>
                    <div class='select-container'>
                      <select class='custom-select'>
                        <option selected=''>Chọn giá</option>
                        <option value='1'>-</option>
                        <option value='2'>-</option>
                        <option value='3'>-</option>
                      </select>
                    </div>
                  </div>
                  <div class='col-md-6 col-lg-3 my-3'>
                    <button
                      type='button'
                      class='btn btn-lg btn-block btn-light btn-custom'
                      id='contact-submit'
                    >
                      Lọc
                    </button>
                  </div>
                </div>
              </form>

              <div class='filter-result'>
                <p class='mb-30 ff-montserrat'>Tổng BĐS : {posts.length}</p>

                {displayPosts}

                {/* <div class='job-box d-md-flex align-items-center justify-content-between mb-30'>
                  <div class='job-left my-4 d-md-flex align-items-center flex-wrap'>
                    <div class='img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex'>
                      FD
                    </div>
                    <div class='job-content'>
                      <h5 class='text-center text-md-left'>
                        Front End Developer
                      </h5>
                      <ul class='d-md-flex flex-wrap text-capitalize ff-open-sans'>
                        <li class='mr-md-4'>
                          <i class='zmdi zmdi-pin mr-2'></i> Los Angeles
                        </li>
                        <li class='ms-4'>
                          <i class='zmdi zmdi-money mr-2'></i> 2500-3500/pm
                        </li>
                        <li class='ms-4'>
                          <i class='zmdi zmdi-time mr-2'></i> Full Time
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class='job-right my-4 flex-shrink-0'>
                    <a
                      href='#'
                      class='btn d-block w-100 d-sm-inline-block btn-light'
                    >
                      Apply now
                    </a>
                  </div>
                </div> */}
              </div>
            </div>

            {/* <!-- START Pagination --> */}
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
            {/* <!-- END Pagination --> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default RealestateManage
