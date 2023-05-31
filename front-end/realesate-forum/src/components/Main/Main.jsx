import React, { useState, useEffect, useContext } from "react"
import AuthContext from "../../context/AuthContext"
import axios from "../MainSignup/axios"
import { Link } from "react-router-dom"

const Main = () => {
  const { category, navigate } = useContext(AuthContext)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:8000/forum/post-list/?category=${category}`,
    })
      .then((res) => {
        setPosts(res.data)
      })
      .catch((e) => console.dir(e))
  }, [category])

  const handleGetDetailPost = (e, id) => {
    navigate(`/post/${id}`)
  }

  useEffect(() => {
    console.log(posts)
  }, [posts])

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

  // useEffect(() => {
  //   compareWithCurrentTime()
  // }, [])

  return (
    <main id='tt-pageContent' className='tt-offset-small'>
      <div className='container'>
        <div className='tt-topic-list'>
          <div className='tt-list-header'>
            {category === "SELL" ? (
              <div className='tt-col-topic'>Mua bán nhà đất</div>
            ) : (
              <div className='tt-col-topic'>Cho thuê nhà đất</div>
            )}
            <div className='tt-col-category'>Khu vực</div>
            <div className='tt-col-value hide-mobile'>Lượt like</div>
            <div className='tt-col-value hide-mobile'>Trả lời</div>
            <div className='tt-col-value hide-mobile'>lượt xem</div>
            <div className='tt-col-value'>thời điểm</div>
          </div>
          <div className='tt-topic-alert tt-alert-default' role='alert'>
            <a href='#' target='_blank'>
              5 bài viết
            </a>{" "}
            vừa được thêm, click vào <a href=''>đây</a> để tải ...
          </div>
          {posts.map((post) => (
            <div
              className='tt-item tt-itemselect'
              // onClick={(e) => handleGetDetailPost(e, post.id)}
            >
              <div className='tt-col-avatar'>
                <svg className='tt-icon'>
                  {/* {post.created_by &&
                    post.created_by.username.charAt(0).toLowerCase()} */}
                  <use
                    xlinkHref={`#icon-ava-${
                      post.created_by &&
                      post.created_by.username.charAt(0).toLowerCase()
                    }`}
                  ></use>
                </svg>
              </div>
              <div className='tt-col-description'>
                <h6 className='tt-title'>
                  <Link
                    to={`/post/${post.id}`}
                    onClick={() => {
                      setInterval(() => {
                        window.location.reload()
                      }, 500)
                    }}
                  >
                    <svg className='tt-icon'>
                      <use xlinkHref='#icon-pinned'></use>
                    </svg>
                    {post.title}
                  </Link>
                </h6>
                <div className='row align-items-center no-gutters'>
                  <div className='col-11'>
                    <ul className='tt-list-badge'>
                      <li className='show-mobile'>
                        <a href='#'>
                          <span
                            className={
                              post.region &&
                              `tt-color${post.region.color_code} tt-badge`
                            }
                          >
                            {post.region && post.region.region_name}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <span className='tt-badge'>
                            {category === "SELL"
                              ? "Mua bán - Nhà đất"
                              : "Cho thuê - Nhà đất"}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <span className='tt-badge'>Câu hỏi</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='col-1 ml-auto show-mobile'>
                    <div className='tt-value'>1h</div>
                  </div>
                </div>
              </div>
              <div className='tt-col-category'>
                <span
                  className={
                    post.region && `tt-color${post.region.color_code} tt-badge`
                  }
                >
                  {post.region && post.region.region_name}
                </span>
              </div>
              <div className='tt-col-value hide-mobile'>
                {Math.floor(Math.random() * 1000) + 1}
              </div>
              <div className='tt-col-value tt-color-select hide-mobile'>
                {post.comment_count}
              </div>
              <div className='tt-col-value hide-mobile'>-</div>
              <div className='tt-col-value hide-mobile'>
                {compareWithCurrentTime(post.created_date)}
              </div>
            </div>
          ))}

          {/* <div className='tt-item tt-itemselect'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-l'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  <svg className='tt-icon'>
                    <use xlinkHref='#icon-locked'></use>
                  </svg>
                  We’re removing Envato Credits from Market
                </a>
              </h6>
              <div className='row align-items-center no-gutters hide-desktope'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color02 tt-badge'>video</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>2h</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color02 tt-badge'>video</span>
            </div>
            <div className='tt-col-value hide-mobile'>584</div>
            <div className='tt-col-value tt-color-select hide-mobile'>35</div>
            <div className='tt-col-value hide-mobile'>1.3k</div>
            <div className='tt-col-value hide-mobile'>2h</div>
          </div>
          <div className='tt-item tt-itemselect'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-d'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  Web Hosting Packages for ThemeForest WordPress
                </a>
              </h6>
              <div className='row align-items-center no-gutters'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color03 tt-badge'>exchange</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>themeforest</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>elements</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>2h</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color03 tt-badge'>exchange</span>
            </div>
            <div className='tt-col-value hide-mobile'>401</div>
            <div className='tt-col-value tt-color-select hide-mobile'>975</div>
            <div className='tt-col-value hide-mobile'>12.6k</div>
            <div className='tt-col-value hide-mobile'>2h</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-c'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  Review Queue Changes for VideoHive & PhotoDune
                </a>
              </h6>
              <div className='row align-items-center no-gutters'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color04 tt-badge'>pets</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>videohive</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>photodune</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>1d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color04 tt-badge'>pets</span>
            </div>
            <div className='tt-col-value hide-mobile'>308</div>
            <div className='tt-col-value tt-color-select hide-mobile'>660</div>
            <div className='tt-col-value hide-mobile'>8.3k</div>
            <div className='tt-col-value hide-mobile'>1d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-n'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  Does Envato act against the authors of Envato markets?
                </a>
              </h6>
              <div className='row align-items-center no-gutters hide-desktope'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color05 tt-badge'>music</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>1d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color05 tt-badge'>music</span>
            </div>
            <div className='tt-col-value hide-mobile'>358</div>
            <div className='tt-col-value tt-color-select hide-mobile'>68</div>
            <div className='tt-col-value hide-mobile'>8.3k</div>
            <div className='tt-col-value hide-mobile'>1d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-h'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  <svg className='tt-icon'>
                    <use xlinkHref='#icon-locked'></use>
                  </svg>
                  We Want to Hear From You! What Would You Like?
                </a>
              </h6>
              <div className='row align-items-center no-gutters hide-desktope'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color06 tt-badge'>movies</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>2d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color06 tt-badge'>movies</span>
            </div>
            <div className='tt-col-value hide-mobile'>671</div>
            <div className='tt-col-value tt-color-select hide-mobile'>29</div>
            <div className='tt-col-value hide-mobile'>1.3k</div>
            <div className='tt-col-value hide-mobile'>2d</div>
          </div>
          <div className='tt-item tt-item-popup'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-f'></use>
              </svg>
            </div>
            <div className='tt-col-message'>
              Looks like you are new here. Register for free, learn and
              contribute.
            </div>
            <div className='tt-col-btn'>
              <button type='button' className='btn btn-primary'>
                Log in
              </button>
              <button type='button' className='btn btn-secondary'>
                Sign up
              </button>
              <button type='button' className='btn-icon'>
                <svg className='tt-icon'>
                  <use xlinkHref='#icon-cancel'></use>
                </svg>
              </button>
            </div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-t'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'> Cannot customize my intro </a>
              </h6>
              <div className='row align-items-center no-gutters'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color07 tt-badge'>video games</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>videohive</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>photodune</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>2d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color07 tt-badge'>video games</span>
            </div>
            <div className='tt-col-value hide-mobile'>364</div>
            <div className='tt-col-value tt-color-select hide-mobile'>36</div>
            <div className='tt-col-value hide-mobile'>982</div>
            <div className='tt-col-value hide-mobile'>2d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-k'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  <svg className='tt-icon'>
                    <use xlinkHref='#icon-verified'></use>
                  </svg>
                  Microsoft Word and Power Point
                </a>
              </h6>
              <div className='row align-items-center no-gutters hide-desktope'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color08 tt-badge'>youtube</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>3d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color08 tt-badge'>youtube</span>
            </div>
            <div className='tt-col-value hide-mobile'>698</div>
            <div className='tt-col-value tt-color-select hide-mobile'>78</div>
            <div className='tt-col-value hide-mobile'>2.1k</div>
            <div className='tt-col-value hide-mobile'>3d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-v'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  First website template got rejected.
                </a>
              </h6>
              <div className='row align-items-center no-gutters hide-desktope'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color09 tt-badge'>social</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>3d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color09 tt-badge'>social</span>
            </div>
            <div className='tt-col-value hide-mobile'>12</div>
            <div className='tt-col-value tt-color-select hide-mobile'>3</div>
            <div className='tt-col-value hide-mobile'>268</div>
            <div className='tt-col-value hide-mobile'>3d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-k'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  <svg className='tt-icon'>
                    <use xlinkHref='#icon-pinned'></use>
                  </svg>
                  Proform or looking for contacting billing department
                </a>
              </h6>
              <div className='row align-items-center no-gutters'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color10 tt-badge'>science</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>contests</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>authors</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>3d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color10 tt-badge'>science</span>
            </div>
            <div className='tt-col-value hide-mobile'>274</div>
            <div className='tt-col-value tt-color-select hide-mobile'>114</div>
            <div className='tt-col-value hide-mobile'>2.3k</div>
            <div className='tt-col-value hide-mobile'>3d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-y'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  <svg className='tt-icon'>
                    <use xlinkHref='#icon-locked'></use>
                  </svg>
                  Refund for wrongly purchase HTML template
                </a>
              </h6>
              <div className='row align-items-center no-gutters hide-desktope'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color11 tt-badge'>
                          entertainment
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>3d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color11 tt-badge'>entertainment</span>
            </div>
            <div className='tt-col-value hide-mobile'>657</div>
            <div className='tt-col-value tt-color-select hide-mobile'>177</div>
            <div className='tt-col-value hide-mobile'>2.6k</div>
            <div className='tt-col-value hide-mobile'>3d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-s'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  Why all my affiliate balance is pending?
                </a>
              </h6>
              <div className='row align-items-center no-gutters'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color03 tt-badge'>exchange</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>themeforest</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>elements</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>4d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color03 tt-badge'>exchange</span>
            </div>
            <div className='tt-col-value hide-mobile'>37</div>
            <div className='tt-col-value tt-color-select hide-mobile'>31</div>
            <div className='tt-col-value hide-mobile'>257</div>
            <div className='tt-col-value hide-mobile'>4d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-l'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  Google snippets wordpress plugin
                </a>
              </h6>
              <div className='row align-items-center no-gutters'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color04 tt-badge'>pets</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>videohive</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>photodune</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>4d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color04 tt-badge'>pets</span>
            </div>
            <div className='tt-col-value hide-mobile'>987</div>
            <div className='tt-col-value tt-color-select hide-mobile'>271</div>
            <div className='tt-col-value hide-mobile'>3.8k</div>
            <div className='tt-col-value hide-mobile'>4d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-n'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'> How to use Team Listing? </a>
              </h6>
              <div className='row align-items-center no-gutters hide-desktope'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color09 tt-badge'>social</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>5d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color09 tt-badge'>social</span>
            </div>
            <div className='tt-col-value hide-mobile'>324</div>
            <div className='tt-col-value tt-color-select hide-mobile'>163</div>
            <div className='tt-col-value hide-mobile'>2.3k</div>
            <div className='tt-col-value hide-mobile'>5d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-r'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  <svg className='tt-icon'>
                    <use xlinkHref='#icon-locked'></use>
                  </svg>
                  Can’t change image on main page of Coaching Theme
                </a>
              </h6>
              <div className='row align-items-center no-gutters hide-desktope'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color02 tt-badge'>video</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>5d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color02 tt-badge'>video</span>
            </div>
            <div className='tt-col-value hide-mobile'>879</div>
            <div className='tt-col-value tt-color-select hide-mobile'>237</div>
            <div className='tt-col-value hide-mobile'>4.5k</div>
            <div className='tt-col-value hide-mobile'>5d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-b'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  Documentation on Glitch package usage?
                </a>
              </h6>
              <div className='row align-items-center no-gutters'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color12 tt-badge'>arts</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>themeforest</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>elements</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>5d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color12 tt-badge'>arts</span>
            </div>
            <div className='tt-col-value hide-mobile'>726</div>
            <div className='tt-col-value tt-color-select hide-mobile'>246</div>
            <div className='tt-col-value hide-mobile'>7.6k</div>
            <div className='tt-col-value hide-mobile'>5d</div>
          </div>
          <div className='tt-item'>
            <div className='tt-col-avatar'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-ava-a'></use>
              </svg>
            </div>
            <div className='tt-col-description'>
              <h6 className='tt-title'>
                <a href='page-single-topic.html'>
                  Woohoo! You’ve made it. Welcome to the Elite Club
                </a>
              </h6>
              <div className='row align-items-center no-gutters'>
                <div className='col-11'>
                  <ul className='tt-list-badge'>
                    <li className='show-mobile'>
                      <a href='#'>
                        <span className='tt-color04 tt-badge'>pets</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>videohive</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='tt-badge'>photodune</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-1 ml-auto show-mobile'>
                  <div className='tt-value'>5d</div>
                </div>
              </div>
            </div>
            <div className='tt-col-category'>
              <span className='tt-color04 tt-badge'>pets</span>
            </div>
            <div className='tt-col-value hide-mobile'>674</div>
            <div className='tt-col-value tt-color-select hide-mobile'>128</div>
            <div className='tt-col-value hide-mobile'>1.3k</div>
            <div className='tt-col-value hide-mobile'>5d</div>
          </div> */}
          <div className='tt-row-btn'>
            <button type='button' className='btn-icon js-topiclist-showmore'>
              <svg className='tt-icon'>
                <use xlinkHref='#icon-load_lore_icon'></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main
