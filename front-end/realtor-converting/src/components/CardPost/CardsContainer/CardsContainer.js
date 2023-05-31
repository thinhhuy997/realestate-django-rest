import {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import CardPost from "../CardPost";
import queryString from 'query-string';
import Paginationer from "../Paginationer/Paginationer";
import {Col, Row} from "react-bootstrap";

CardsContainer.propTypes = {
    apiUrl: PropTypes.string,
    limit: PropTypes.number,
    offset: PropTypes.number,
    has_pagination: PropTypes.bool,
};

CardsContainer.defaultProps = {
    apiUrl: '',
    limit: 1,
    offset: 0,
    has_pagination: false,
}

function CardsContainer(props) {

    const {apiUrl, limitoffset, has_pagination} = props;
    const [postList, setPostList] = useState([]);

    const [pagination, setPagination] = useState({
        offset: limitoffset["offset"],
        limit: limitoffset["limit"],
        count: 10,
    });

    const [filters, setFilters] = useState({
        limit: limitoffset["limit"],
        offset: 0
    })

    function handlePageChange(newOffset) {
        setFilters({
            ...filters,
            offset: newOffset,
        })
    }

    const paramString = queryString.stringify(filters);
    const apiUrloffset = apiUrl + `?${paramString}`;
    console.log(apiUrloffset)

    useEffect(() => {
        async function fetchPostList() {
            try {
                let requestUrl = apiUrloffset;
                const headers = {
                    "Content-type": "application/json",
                    // "X-CSRFToken": csrftoken,
                };
                const response = await fetch(requestUrl, {headers: headers});
                const responseJson = await response.json();
                const {results, count, next, previous} = responseJson;
                try{
                    setPagination({
                    ...pagination,
                    count: count,
                    offset: next.split('offset=')[1] - filters["limit"]
                })
                }catch (e) {
                    setPagination({
                    ...pagination,
                    count: count,
                    offset: previous.split('offset=')[1] + filters["limit"]
                })
                }
                setPostList(results);
            } catch (e) {
                console.log(e.message);
            }

        }

        fetchPostList();
    }, [filters])

    // console.log(postList)

    return (
        <Row>
            {postList.map((post) => (
                <Col lg={3} key={post.id}> <CardPost post={post}/> </Col>
            ))}
            {has_pagination ?
                <Paginationer
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
                :
                <div></div>}
        </Row>
    );
}

export default CardsContainer;

// parent -> gọi <Paginationer onPageChange={hàm xử lý event handleChange}>
// -> child lấy hàm handleChange từ props[onPageChange] -> gọi hàm onPageChange(tham số) để parent xử lý
