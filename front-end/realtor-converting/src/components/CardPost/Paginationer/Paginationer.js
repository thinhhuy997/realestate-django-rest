import React from 'react';
import PropTypes, {func} from 'prop-types';
import {Button, Container} from "react-bootstrap";
import "./Paginationer.scss"

Paginationer.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Paginationer.defaultProps = {
    onPageChange: null,
}

function Paginationer(props) {

    const {pagination, onPageChange} = props;
    const {offset, limit, count} = pagination;
    const current_page = Math.ceil(offset / limit) + 1;

    const max_display_page = 10;

    function generatePageButtons(max_display, current) {
        // tạo mạng gồm các nút page
        var btns = [];

        if (count <= limit) {
            btns.push({
                "page": 1,
                "active": "active",
            });
            return btns
        }


        var min_page = current - 5 <= 0 ? 1 : current - 5;
        var max_page = current + 5 > count ? count : (current + 5 < 10 ? 10 : current + 5);

        for (var i = min_page; i <= max_page; i++) {
            // btns.push(<span className='indent' key={i}></span>);
            btns.push({
                "page": i,
                "active": current === i ? "active" : null,
            });
        }
        return btns;
    }

    const btns_list = generatePageButtons(max_display_page, current_page);

    // use thi one for mapping
    // <a key={i} className={current_page == i ? 'active' : null} href="javascript:;">{i + 1}</a>

    function handlePageChange(newOffset, is_disabled) {
        if (is_disabled) {
            return;
        }
        if (onPageChange) {
            onPageChange(newOffset);
        }
    }

    // limit = 8
    // page 1 - offset = 0
    // page 2 - offset = 8
    // page 3 - offset = 16
    // page 5 - offset =

    return (
        <Container className={"mt-4"}>

            <Container className="pagination">
                <a href="javascript:;" onClick={() => handlePageChange(offset - limit, offset - limit < 0)}>&laquo;</a>

                {btns_list.map((button) => (
                    <a
                        className={button["active"]}
                        href="javascript:;"
                        onClick={() => handlePageChange((button["page"] - 1) * limit)}
                    >{button["page"]}</a>
                ))}

                <a href="javascript:;"
                   onClick={() => handlePageChange(offset + limit, offset + limit >= count)}>&raquo;</a>
            </Container>

        </Container>
    );
}

export default Paginationer;