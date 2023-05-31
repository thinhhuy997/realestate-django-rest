import {Col, Container, Row} from "react-bootstrap";
import "./BuyHome.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {createContext, useState} from 'react';
import SearchNavbar from "./SearchNavbar/SearchNavbar";
import CardsContainer from "../CardPost/CardsContainer/CardsContainer";
import FilterForm from "./FilterNav/FilterForm";

export const FilterContext = createContext()

function BuyHome(props) {

    // const apiUrl = "https://realestate-restapi-django3.herokuapp.com/api/re-post-list-pagination/?limit=40&offset=8";
    const apiUrl = "http://127.0.0.1:8000/api/re-post2-list-create/";
    const has_pagination = true;

    const [filters, setFilters] = useState({
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
    })


    const [limitoffset, setLimitOffset] = useState({
        limit: 12,
        offset: 0
    })

    function handleFilterChanged(mess) {
        setFilters({
            ...filters,
            limit: 8,
        })
        setLimitOffset({
            ...limitoffset,
            limit: 8
        })
        console.log("Buy home say: ", mess)
        console.log("Buy home say: ", limitoffset["limit"])
    }

    return (
        <FilterContext.Provider value={filters}>
            <SearchNavbar></SearchNavbar>
            <Row>
                <Col>
                    <FilterForm onFilterChanged={handleFilterChanged}/>
                </Col>
                <Col lg={8}>
                    <Container>
                        <CardsContainer apiUrl={apiUrl} limitoffset={limitoffset}
                                        has_pagination={has_pagination}/>
                    </Container>
                </Col>
                <Col></Col>

            </Row>

        </FilterContext.Provider>
    );

}

export default BuyHome;
