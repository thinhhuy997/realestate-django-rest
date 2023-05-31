import { Col, Container, Row } from "react-bootstrap"
import "./BuyHome.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useContext } from "react"
import FilterForm from "./FilterNav/FilterForm"
import CardPost from "../CardPost/CardPost"
import Paginationer from "../CardPost/Paginationer/Paginationer"
import { useEffect } from "react"
import queryString from "query-string"
import AuthContext from "../../context/AuthContext"

function BuyHome(props) {
  // const apiUrl = "https://realestate-restapi-django3.herokuapp.com/api/re-post-list-pagination/?limit=40&offset=8";
  const apiUrl = "http://127.0.0.1:8000/api/re-post2-list-create/"
  const has_pagination = true

  const [filters, setFilters] = useState({
    search: "",
    min_price: "",
    max_price: "",
    min_area: "",
    max_area: "",
    min_mattien: "",
    max_mattien: "",
    min_duongvao: "",
    max_duongvao: "",
    min_bedroom: "",
    max_bedroom: "",
    min_toilet: "",
    max_toilet: "",
    region: "",
    huong_nha: "",
    phap_ly: "",
    limit: 12,
    offset: 0,
  })

  // const limitoffset = useState({
  //     limit: 12,
  //     offset: 0,
  // })

  function handleFilterChanged(newFiltersValues) {
    setFilters({
      ...newFiltersValues,
    })
    console.log(filters)
  }

  const [postList, setPostList] = useState([])

  const [pagination, setPagination] = useState({
    offset: filters["offset"],
    limit: filters["limit"],
    count: 10,
  })

  function handlePageChange(newOffset) {
    setFilters({
      ...filters,
      offset: newOffset,
    })
  }

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [filters])

  useEffect(() => {
    const paramString = queryString.stringify(filters)
    const apiUrloffset = apiUrl + `?${paramString}`

    // check url api có đúng hay ko
    console.log(apiUrloffset)

    async function fetchPostList() {
      try {
        let requestUrl = apiUrloffset
        const headers = {
          "Content-type": "application/json",
          // "X-CSRFToken": csrftoken,
        }
        const response = await fetch(requestUrl, { headers: headers })
        const responseJson = await response.json()
        const { results, count, next, previous } = responseJson
        try {
          setPagination({
            ...pagination,
            count: count,
            offset: next.split("offset=")[1].split("&")[0] - filters["limit"],
          })
        } catch (e) {
          try {
            setPagination({
              ...pagination,
              count: count,
              offset:
                previous.split("offset=")[1].split("&")[0] + filters["limit"],
            })
          } catch (e) {
            setPagination({
              ...pagination,
              count: count,
              offset: 0,
            })
          }
        }
        setPostList(results)
      } catch (e) {
        console.log(e.message)
      }
    }

    fetchPostList()
  }, [filters])

  // console.log(postList)

  // xử lý phần watchlist
  const { idPostList, setIdPostList } = useContext(AuthContext)
  let [userProfile, setUserProfile] = useState(() =>
    localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : null
  )
  let [watchList, setWatchList] = useState([])

  // useEffect(() => {
  //   const watchListTemp = localStorage.getItem(
  //     `watch_list/${userProfile.username}`
  //   )
  //     ? JSON.parse(localStorage.getItem(`watch_list/${userProfile.username}`))
  //     : null
  //   setWatchList(watchListTemp)
  // }, [idPostList])

  // useEffect(() => {
  //   console.log("watchList: ", watchList)
  // }, [watchList])

  return (
    <div>
      {/*<SearchNavbar></SearchNavbar>*/}
      <Row>
        <Col>
          <FilterForm onFilterChanged={handleFilterChanged} filter={filters} />
        </Col>
        <Col lg={8}>
          <Container>
            <Row>
              <p>có {pagination["count"]} kết quả</p>
              {postList.map((post) => (
                <Col lg={3} key={post.id}>
                  {" "}
                  <CardPost post={post} />{" "}
                </Col>
              ))}
              {has_pagination ? (
                <Paginationer
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              ) : (
                <div></div>
              )}
            </Row>
          </Container>
        </Col>
        <Col></Col>
      </Row>
    </div>
  )
}

export default BuyHome
