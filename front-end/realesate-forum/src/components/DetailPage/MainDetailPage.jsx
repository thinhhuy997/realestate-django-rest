import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import axios from "../../api/axios"
import AuthContext from "../../context/AuthContext"

const path_name = window.location.pathname
// const id = path_name.substring(6, path_name.length + 1)

const MainDetailPage = () => {
  const { userProfile } = useContext(AuthContext)
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState(null)
  const [commentText, setCommentText] = useState("")

  const [lastFivePosts, setLastFivePosts] = useState(null)

  useEffect(() => {
    handleGetDetailPost()
    handleGetPostComments()
    handleGetLastFivePosts()
  }, [])

  const handleGetDetailPost = async () => {
    try {
      const response = await axios.get(`/forum/post-detail/${id}/`)
      setPost(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleGetLastFivePosts = async () => {
    try {
      const response = await axios.get("/forum/retrieve-last-five-posts/")
      setLastFivePosts(response.data["items"])
    } catch (err) {
      console.log(err)
    }
  }

  const handleGetPostComments = async () => {
    try {
      const response = await axios.get(`/forum/get-comment-by-post-id/${id}/`)
      setComments(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `/forum/comment-list/`,
        JSON.stringify({
          created_by: userProfile.user_id,
          post: id,
          comment_text: commentText,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const compareWithCurrentTime = (time) => {
    var currentDate = new Date()
    var postDate = new Date(time)
    // var deviantTime = currentDate - postDate
    var hours = (currentDate.getTime() - postDate.getTime()) / 1000 / 60 / 60
    if (hours > 1.0) {
      return hours.toString().split(".")[0] + "h trước"
    }
    return (
      hours.toString().split(".")[1].charAt(0) +
      hours.toString().split(".")[1].charAt(1) +
      "m trước"
    )
  }

  return (
    <main id='tt-pageContent'>
      <div class='container'>
        <div class='tt-single-topic-list'>
          <div class='tt-item'>
            <div class='tt-single-topic'>
              <div class='tt-item-header'>
                <div class='tt-item-info info-top'>
                  <div class='tt-avatar-icon'>
                    <i class='tt-icon'>
                      <svg>
                        {/* <use xlinkHref='#icon-ava-d'></use> */}
                        {post?.created_by && (
                          <use
                            xlinkHref={`#icon-ava-${
                              post.created_by &&
                              post.created_by.username.charAt(0).toLowerCase()
                            }`}
                          ></use>
                        )}
                      </svg>
                    </i>
                  </div>
                  <div class='tt-avatar-title'>
                    {post?.created_by && (
                      <a href=''>{post.created_by.username}</a>
                    )}
                  </div>
                  <a href='#' class='tt-info-time'>
                    <i class='tt-icon'>
                      <svg>
                        <use xlinkHref='#icon-time'></use>
                      </svg>
                    </i>
                    {post?.created_date && post.created_date}
                  </a>
                </div>
                <h3 class='tt-item-title'>
                  {post?.title && <a href=''>{post.title}</a>}
                </h3>
                <div class='tt-item-tag'>
                  <ul class='tt-list-badge'>
                    <li>
                      <a href=''>
                        <span class='tt-color03 tt-badge'>
                          {post?.region && post.region.region_name}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class='tt-item-description content-border-bottom'>
                <p>{post?.content && post.content}</p>

                <div className='img-list row'>
                  {post?.image_1 && <img src={post.image_1} alt='post image' />}
                  {post?.image_2 && <img src={post.image_1} alt='post image' />}
                  {post?.image_3 && <img src={post.image_3} alt='post image' />}
                  {post?.image_4 && <img src={post.image_4} alt='post image' />}
                  {post?.image_5 && <img src={post.image_5} alt='post image' />}
                  {post?.image_6 && <img src={post.image_6} alt='post image' />}
                  {post?.image_7 && <img src={post.image_7} alt='post image' />}
                  {post?.image_8 && <img src={post.image_8} alt='post image' />}
                  {post?.image_9 && <img src={post.image_9} alt='post image' />}
                  {post?.image_10 && (
                    <img src={post.image_10} alt='post image' />
                  )}
                </div>
              </div>
              <div class='tt-item-info info-bottom'>
                <a href='#' class='tt-icon-btn'>
                  <i class='tt-icon'>
                    <svg>
                      <use xlinkHref='#icon-like'></use>
                    </svg>
                  </i>
                  <span class='tt-text'>
                    {Math.floor(Math.random() * 1000)}
                  </span>
                </a>
                <a href='#' class='tt-icon-btn'>
                  <i class='tt-icon'>
                    <svg>
                      <use xlinkHref='#icon-dislike'></use>
                    </svg>
                  </i>
                  <span class='tt-text'>{Math.floor(Math.random() * 100)}</span>
                </a>
                <a href='#' class='tt-icon-btn'>
                  <i class='tt-icon'>
                    <svg>
                      <use xlinkHref='#icon-favorite'></use>
                    </svg>
                  </i>
                  <span class='tt-text'>{Math.floor(Math.random() * 50)}</span>
                </a>
                <div class='col-separator'></div>
                <a href='#' class='tt-icon-btn tt-hover-02 tt-small-indent'>
                  <i class='tt-icon'>
                    <svg>
                      <use xlinkHref='#icon-share'></use>
                    </svg>
                  </i>
                </a>
                <a href='#' class='tt-icon-btn tt-hover-02 tt-small-indent'>
                  <i class='tt-icon'>
                    <svg>
                      <use xlinkHref='#icon-flag'></use>
                    </svg>
                  </i>
                </a>
                <a href='#' class='tt-icon-btn tt-hover-02 tt-small-indent'>
                  <i class='tt-icon'>
                    <svg>
                      <use xlinkHref='#icon-reply'></use>
                    </svg>
                  </i>
                </a>
              </div>
            </div>
          </div>

          {comments &&
            comments.map((comment) => (
              <div class='tt-item'>
                <div class='tt-single-topic'>
                  <div class='tt-item-header pt-noborder'>
                    <div class='tt-item-info info-top'>
                      <div class='tt-avatar-icon'>
                        <i class='tt-icon'>
                          <svg>
                            <use
                              xlinkHref={`#icon-ava-${
                                comment.created_by &&
                                comment.created_by.charAt(0).toLowerCase()
                              }`}
                            ></use>
                          </svg>
                        </i>
                      </div>
                      <div class='tt-avatar-title'>
                        <a href='#'>{comment.created_by}</a>
                      </div>
                      <a href='#' class='tt-info-time'>
                        <i class='tt-icon'>
                          <svg>
                            <use xlinkHref='#icon-time'></use>
                          </svg>
                        </i>
                        {comment?.created_at && comment.created_at}
                      </a>
                    </div>
                  </div>
                  <div class='tt-item-description'>{comment.comment_text}</div>
                  <div class='tt-item-info info-bottom'>
                    <a href='#' class='tt-icon-btn'>
                      <i class='tt-icon'>
                        <svg>
                          <use xlinkHref='#icon-like'></use>
                        </svg>
                      </i>
                      <span class='tt-text'>
                        {Math.floor(Math.random() * 100)}
                      </span>
                    </a>
                    <a href='#' class='tt-icon-btn'>
                      <i class='tt-icon'>
                        <svg>
                          <use xlinkHref='#icon-dislike'></use>
                        </svg>
                      </i>
                      <span class='tt-text'>
                        {Math.floor(Math.random() * 10)}
                      </span>
                    </a>
                    <a href='#' class='tt-icon-btn'>
                      <i class='tt-icon'>
                        <svg>
                          <use xlinkHref='#icon-favorite'></use>
                        </svg>
                      </i>
                      <span class='tt-text'>
                        {Math.floor(Math.random() * 20)}
                      </span>
                    </a>
                    <div class='col-separator'></div>
                    <a href='#' class='tt-icon-btn tt-hover-02 tt-small-indent'>
                      <i class='tt-icon'>
                        <svg>
                          <use xlinkHref='#icon-share'></use>
                        </svg>
                      </i>
                    </a>
                    <a href='#' class='tt-icon-btn tt-hover-02 tt-small-indent'>
                      <i class='tt-icon'>
                        <svg>
                          <use xlinkHref='#icon-flag'></use>
                        </svg>
                      </i>
                    </a>
                    <a href='#' class='tt-icon-btn tt-hover-02 tt-small-indent'>
                      <i class='tt-icon'>
                        <svg>
                          <use xlinkHref='#icon-reply'></use>
                        </svg>
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div class='tt-wrapper-inner'>
          <h4 class='tt-title-separator'>
            <span>Đã hết các bình luận</span>
          </h4>
        </div>
        {/* <div class='tt-topic-list'>
          <div class='tt-item tt-item-popup'>
            <div class='tt-col-avatar'>
              <svg class='tt-icon'>
                <use xlinkHref='#icon-ava-f'></use>
              </svg>
            </div>
            <div class='tt-col-message'>
              Looks like you are new here. Register for free, learn and
              contribute.
            </div>
            <div class='tt-col-btn'>
              <button type='button' class='btn btn-primary'>
                Log in
              </button>
              <button type='button' class='btn btn-secondary'>
                Sign up
              </button>
              <button type='button' class='btn-icon'>
                <svg class='tt-icon'>
                  <use xlinkHref='#icon-cancel'></use>
                </svg>
              </button>
            </div>
          </div>
        </div> */}
        <form onSubmit={handleSubmit}>
          <div class='tt-wrapper-inner'>
            <div class='pt-editor form-default'>
              <h6 class='pt-title'>Đăng bình luận của bạn</h6>
              <div class='pt-row'>
                <div class='col-left'>
                  <ul class='pt-edit-btn'>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-quote'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-bold'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-italic'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-share_topic'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-blockquote'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-performatted'></use>
                        </svg>
                      </button>
                    </li>
                    <li class='hr'></li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-upload_files'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-bullet_list'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-heading'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-horizontal_line'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-emoticon'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-settings'></use>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type='button' class='btn-icon'>
                        <svg class='tt-icon'>
                          <use xlinkHref='#icon-color_picker'></use>
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
                <div class='col-right tt-hidden-mobile'>
                  <a href='#' class='btn btn-primary'>
                    Xem trước
                  </a>
                </div>
              </div>
              <div class='form-group'>
                <textarea
                  name='message'
                  class='form-control'
                  rows='5'
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder='Viết phản hồi tại đây...'
                ></textarea>
              </div>
              <div class='pt-row'>
                <div class='col-auto'>
                  <div class='checkbox-group'>
                    <input
                      type='checkbox'
                      id='checkBox21'
                      name='checkbox'
                      checked=''
                    />
                  </div>
                </div>
                <div class='col-auto'>
                  <button class='btn btn-secondary btn-width-lg' type='submit'>
                    Đăng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class='tt-topic-list tt-ofset-30'>
          <div class='tt-list-search'>
            <div class='tt-title'>Các chủ đề mới nhất</div>
            {/* <!-- tt-search --> */}
            <div class='tt-search'>
              <form class='search-wrapper'>
                <div class='search-form'>
                  <input
                    type='text'
                    class='tt-search__input'
                    placeholder='Tìm kiếm chủ đề...'
                  />
                  <button class='tt-search__btn' type='submit'>
                    <svg class='tt-icon'>
                      <use xlinkHref='#icon-search'></use>
                    </svg>
                  </button>
                  <button class='tt-search__close'>
                    <svg class='tt-icon'>
                      <use xlinkHref='#icon-cancel'></use>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            {/* <!-- /tt-search --> */}
          </div>
          <div class='tt-list-header tt-border-bottom'>
            <div class='tt-col-topic'>Chủ đề</div>
            <div class='tt-col-category'>Khu vực</div>
            <div class='tt-col-value hide-mobile'>lượt like</div>
            <div class='tt-col-value hide-mobile'>trả lời</div>
            <div class='tt-col-value hide-mobile'>lượt xem</div>
            <div class='tt-col-value'>time</div>
          </div>

          {lastFivePosts &&
            lastFivePosts.map((post) => (
              <div class='tt-item'>
                <div class='tt-col-avatar'>
                  <svg class='tt-icon'>
                    <use
                      xlinkHref={`#icon-ava-${
                        post.created_by &&
                        post.created_by.charAt(0).toLowerCase()
                      }`}
                    ></use>
                  </svg>
                </div>
                <div class='tt-col-description'>
                  <h6 class='tt-title'>
                    <a href='#'>
                      <svg class='tt-icon'>
                        <use xlinkHref='#icon-verified'></use>
                      </svg>
                      {post.title}
                    </a>
                  </h6>
                  <div class='row align-items-center no-gutters'>
                    <div class='col-11'>
                      <ul class='tt-list-badge'>
                        <li class='show-mobile'>
                          <a href='#'>
                            <span class='tt-color03 tt-badge'>Trao đổi</span>
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <span class='tt-badge'>
                              {post?.category && post.category == "SELL"
                                ? "Mua bán"
                                : "Thuê"}
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <span class='tt-badge'>Câu hỏi</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class='col-1 ml-auto show-mobile'>
                      <div class='tt-value'>2d</div>
                    </div>
                  </div>
                </div>
                <div class='tt-col-category'>
                  <span
                    className={
                      post.region &&
                      `tt-color${post.region.color_code} tt-badge`
                    }
                  >
                    {post.region.region_name}
                  </span>
                </div>
                <div class='tt-col-value  hide-mobile'>0</div>
                <div class='tt-col-value tt-color-select  hide-mobile'>
                  {post.comment_count}
                </div>
                <div class='tt-col-value  hide-mobile'>-</div>
                <div class='tt-col-value hide-mobile'>
                  {compareWithCurrentTime(post.created_date)}
                </div>
              </div>
            ))}

          <div class='tt-row-btn'>
            <button type='button' class='btn-icon js-topiclist-showmore'>
              <svg class='tt-icon'>
                <use xlinkHref='#icon-load_lore_icon'></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainDetailPage
