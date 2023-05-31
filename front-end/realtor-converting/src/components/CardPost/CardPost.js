import React, {useState, useEffect, useContext} from "react"
import {Button, Card, Col, Row} from "react-bootstrap"
import "./CardPost.scss"
import {Link, Navigate, useNavigate} from "react-router-dom"
import AuthContext from "../../context/AuthContext"

function convertAddress(address) {
    let addresses = address.split(", ")
    return (
        addresses[addresses.length - 3] + ", " + addresses[addresses.length - 2]
    )
}

function convertPrice(price) {
    if (price === 0) return "Thỏa thuận"
    return price > 1
        ? price.toString() + " tỷ"
        : (price * 1000).toString() + " triệu"
}

function convertImg(imgs) {
    let img_url = imgs["image_1"]
    try {
        if (img_url.includes("https%3A")) {
            let img_new_url = img_url.replace(
                "http://127.0.0.1:8000/real_estate/media/",
                ""
            )
            img_new_url = img_new_url.replace("https%3A", "https:")
            return img_new_url
        } else {
            return img_url
        }
    } catch (e) {
        return "https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg"
    }
}

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000)

    var interval = seconds / 31536000

    if (interval > 1) {
        return Math.floor(interval) + " năm"
    }
    interval = seconds / 2592000
    if (interval > 1) {
        return Math.floor(interval) + " tháng"
    }
    interval = seconds / 86400
    if (interval > 1) {
        return Math.floor(interval) + " ngày"
    }
    interval = seconds / 3600
    if (interval > 1) {
        return Math.floor(interval) + " giờ"
    }
    interval = seconds / 60
    if (interval > 1) {
        return Math.floor(interval) + " phút"
    }
    return Math.floor(seconds) + " giây"
}

function convertXMinsAgo(created) {
    return timeSince(Date.parse(created))
}

function CardPost(props) {
    const {post} = props
    const {id, images, title, address, spec_detail, total_price, created_at} =
        post

    const dien_tich = spec_detail["area"]

    let [userProfile, setUserProfile] = useState(() =>
        localStorage.getItem("userProfile")
            ? JSON.parse(localStorage.getItem("userProfile"))
            : null
    )

    const {idPostList, setIdPostList} = useContext(AuthContext)

    // const apiUrl = "http://127.0.0.1:8000/api/re-post2-retrieve-update-delete/";
    // const detailUrl = apiUrl + id + "/";

    const short_address = convertAddress(address)
    const converted_price = convertPrice(total_price)
    let img_url = convertImg(images)
    let last_post = convertXMinsAgo(created_at)

    const handleSaveWatchList = (id_post) => {
        if (!idPostList.includes(id_post)) {
            setIdPostList((prev) => {
                return [...prev, id_post]
            })
        }
        localStorage.setItem(
            `watch_list/${userProfile.username}`,
            JSON.stringify({
                username: userProfile.username,
                id_post_list: idPostList,
            })
        )
    }

    return (
        <Col>
            <Card className='cardpost mt-4'>
                {/*<Card style={{width: 18 + `rem`}} className="cardpost">*/}
                <div className='timer'>{last_post}</div>
                <Card.Img src={img_url} className='card-img-top' alt='...'/>
                <Card.Body>
                    <Card.Title className='card-title'> {title} </Card.Title>
                    <Card.Text className={"card-address fst-italic"}>
                        {" "}
                        {short_address}{" "}
                    </Card.Text>
                    <Row className={"spec_short"}>
                        <Col className={"text-center"}>
                            <p className={"fw-normal fs-5"}> {converted_price}</p>
                        </Col>
                        <Col className={"text-center"}>
                            <p className={"fw-normal fs-5"}>
                <span>
                  {dien_tich} m<sup>2</sup>
                </span>
                            </p>
                        </Col>
                    </Row>
                    {/*<Row>*/}
                    {/*    <p className="card-text mb-2">Địa chỉ:<br/><i>Lộc Tiến, Bảo Lộc, Lâm Đồng</i></p>*/}
                    {/*</Row>*/}
                    <Row>
                        <Col className='text-center'>
                            <Button href={`/detail/${id}`} variant='outline-primary'>
                                Xem
                            </Button>
                        </Col>
                        <Col className='text-center'>
                            <Button
                                variant='outline-success'
                                onClick={() => handleSaveWatchList(id)}
                            >
                                Lưu
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CardPost
