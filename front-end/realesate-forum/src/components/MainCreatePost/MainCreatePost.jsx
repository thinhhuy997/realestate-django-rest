import React, { useState, useEffect, useRef, useContext } from "react"
import AuthContext from "../../context/AuthContext"
import axios from "../MainSignup/axios"

const MainCreatePost = (props) => {
  const titleRef = useRef()
  const errRef = useRef()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [region, setRegion] = useState("")
  const [category, setCategory] = useState("SELL")
  const [imgFiles, setImgFiles] = useState([])

  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  const { userProfile } = useContext(AuthContext)

  useEffect(() => {
    titleRef.current.focus()
    console.log(userProfile.user_id)
  }, [])

  let hiddenFileInput = React.useRef(null)

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0]
    setImgFiles((prev) => {
      return [...prev, event.target.files[0]]
    })
  }

  const handleSubmit = async (e) => {
    var region_id = "26"
    e.preventDefault()
    try {
      const response = await axios.get(`forum/region-id-retrieve/${region}/`)
      region_id = response.data["region_id"]
    } catch (err) {}

    const formData = new FormData()
    formData.append("region", parseInt(region_id))
    formData.append("created_by", userProfile.user_id)
    formData.append("title", title)
    formData.append("content", content)
    formData.append("category", category)

    {
      imgFiles[0] &&
        imgFiles.map((imgFile, id) =>
          formData.append(`image_${parseInt(id) + 1}`, imgFile)
        )
    }

    try {
      const response = await axios.post("/forum/post-list/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      setSuccess(true, () => setTimeout(() => setSuccess(false), 5000))
      // setTitle("")
      // setContent("")
      // setImgFiles("")
    } catch (err) {
      console.log(err)
      console.log(formData)
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else {
        setErrMsg("Post Failed")
      }
      errRef.current.focus()
    }
  }

  useEffect(() => {
    console.log(region)
  }, [region])

  return (
    <main id='tt-pageContent'>
      <div className='container'>
        <div className='tt-wrapper-inner'>
          <h1 className='tt-title-border'>Tạo bài viết mới</h1>
          <form
            className='form-default form-create-topic'
            onSubmit={handleSubmit}
          >
            <div className='form-group'>
              <label for='inputTopicTitle'>Tiêu đề</label>
              <div className='tt-value-wrapper'>
                <input
                  type='text'
                  name='name'
                  ref={titleRef}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className='form-control'
                  id='inputTopicTitle'
                  placeholder='Tiều đề bài viết của bạn'
                />
                <span className='tt-value-input'>99</span>
              </div>
              <div className='tt-note'>
                Mô tả tốt chủ đề của bạn, đồng thời giữ cho chủ đề càng ngắn gọn
                càng tốt.
              </div>
            </div>
            <div className='form-group'>
              <label>Chọn Mục</label>
              <div className='tt-js-active-btn tt-wrapper-btnicon'>
                <div className='row tt-w410-col-02'>
                  <div
                    className='col-4 col-lg-3 col-xl-2 '
                    onClick={(e) => setCategory("SELL")}
                  >
                    {category === "SELL" ? (
                      <a className='tt-button-icon category'>
                        <span className='tt-icon'>
                          <svg>
                            <use xlinkHref='#icon-discussion'></use>
                          </svg>
                        </span>
                        <span className='tt-text'>Mua bán nhà đất</span>
                      </a>
                    ) : (
                      <a className='tt-button-icon'>
                        <span className='tt-icon'>
                          <svg>
                            <use xlinkHref='#icon-discussion'></use>
                          </svg>
                        </span>
                        <span className='tt-text'>Mua bán nhà đất</span>
                      </a>
                    )}
                  </div>
                  <div
                    className='col-4 col-lg-3 col-xl-2 '
                    onClick={(e) => setCategory("LEASE")}
                  >
                    {category === "LEASE" ? (
                      <a className='tt-button-icon category'>
                        <span className='tt-icon'>
                          <svg>
                            <use xlinkHref='#icon-gallery'></use>
                          </svg>
                        </span>
                        <span className='tt-text'>Cho thuê nhà đất</span>
                      </a>
                    ) : (
                      <a className='tt-button-icon'>
                        <span className='tt-icon'>
                          <svg>
                            <use xlinkHref='#icon-gallery'></use>
                          </svg>
                        </span>
                        <span className='tt-text'>Cho thuê nhà đất</span>
                      </a>
                    )}
                  </div>
                  <div className='col-4 col-lg-3 col-xl-2'>
                    <a href='#' className='tt-button-icon disabledbutton'>
                      <span className='tt-icon'>
                        <svg>
                          <use xlinkHref='#Poll'></use>
                        </svg>
                      </span>
                      <span className='tt-text'>Đang phát triển</span>
                    </a>
                  </div>
                  <div className='col-4 col-lg-3 col-xl-2'>
                    <a href='#' className='tt-button-icon disabledbutton'>
                      <span className='tt-icon'>
                        <svg>
                          <use xlinkHref='#icon-gallery'></use>
                        </svg>
                      </span>
                      <span className='tt-text'>Đang phát triển</span>
                    </a>
                  </div>
                  <div className='col-4 col-lg-3 col-xl-2'>
                    <a href='#' className='tt-button-icon disabledbutton'>
                      <span className='tt-icon'>
                        <svg>
                          <use xlinkHref='#Video'></use>
                        </svg>
                      </span>
                      <span className='tt-text'>Đang phát triển</span>
                    </a>
                  </div>
                  <div className='col-4 col-lg-3 col-xl-2'>
                    <a href='#' className='tt-button-icon disabledbutton'>
                      <span className='tt-icon'>
                        <svg>
                          <use xlinkHref='#Others'></use>
                        </svg>
                      </span>
                      <span className='tt-text'>Đang phát triển</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label for='inputTopicTitle'>Khu vực</label>
                  <select
                    className='form-control'
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value='baoloc' data-region=''>
                      Bảo Lộc
                    </option>
                    <option value='dalat' data-region=''>
                      Đà Lạt
                    </option>
                    <option value='dilinh' data-region=''>
                      Di Linh
                    </option>
                    <option value='baolam' data-region=''>
                      Bảo Lâm
                    </option>
                    <option value='cattien' data-region=''>
                      Cát tiên
                    </option>
                    <option value='dateh' data-region=''>
                      Đạ Tẻh
                    </option>
                    <option value='lamha' data-region=''>
                      Lâm Hà
                    </option>
                    <option value='donduong' data-region=''>
                      Đơn Dương
                    </option>
                    <option value='dahuoai' data-region=''>
                      Đạ Huoai
                    </option>
                    <option value='ductrong' data-region=''>
                      Đức Trọng
                    </option>
                    <option value='lacduong' data-region=''>
                      Lạc Dương
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className='pt-editor'>
              <h6 className='pt-title'>Nội dung</h6>
              <div className='pt-row'>
                <div className='col-left'>
                  <ul className='pt-edit-btn'>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-quote'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-bold'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-italic'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-share_topic'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-blockquote'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-performatted'></use>
                        </svg>
                      </button>
                    </li>
                    <li className='hr'></li>
                    <li>
                      <button
                        type='button'
                        className='btn-icon'
                        onClick={handleClick}
                      >
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-upload_files'></use>
                        </svg>
                      </button>
                      <input
                        type='file'
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                    </li>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-bullet_list'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-heading'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-horizontal_line'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-emoticon'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-settings'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' className='btn-icon'>
                        <svg className='tt-icon'>
                          <use xlinkHref='#icon-color_picker'></use>
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {imgFiles[0] && (
                <div>
                  <p>
                    {imgFiles.map((imgFile, id) => (
                      <span key={id}>{imgFile.name}, </span>
                    ))}
                  </p>
                </div>
              )}
              <div className='form-group'>
                <textarea
                  name='message'
                  className='form-control'
                  rows='5'
                  placeholder='Viết gì đi...'
                  required
                  onChange={(e) => {
                    setContent(e.target.value)
                  }}
                ></textarea>
              </div>

              <div className='row'>
                <div className='col-auto ml-md-auto'>
                  <button
                    className='btn btn-secondary btn-width-lg'
                    type='submit'
                  >
                    Tạo bài viết
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {errMsg && (
        <div class='screenAlert-icon screenAlert-error animate lightbox'>
          <span class='screenAlert-x-mark'>
            <span class='screenAlert-line screenAlert-left animateXLeft'></span>
            <span class='screenAlert-line screenAlert-right animateXRight'></span>
          </span>
          <div class='screenAlert-placeholder'></div>
          <div class='screenAlert-fix'></div>
        </div>
      )}

      {success && (
        <div class='screenAlert-icon screenAlert-success animate lightbox'>
          <span class='screenAlert-line screenAlert-tip animateSuccessTip'></span>
          <span class='screenAlert-line screenAlert-long animateSuccessLong'></span>
          <div class='screenAlert-placeholder'></div>
          <div class='screenAlert-fix'></div>
        </div>
      )}
    </main>
  )
}

export default MainCreatePost
