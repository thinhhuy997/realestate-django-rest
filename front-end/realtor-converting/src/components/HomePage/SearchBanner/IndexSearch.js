import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, FormControl } from 'react-bootstrap';
import '../Home.scss';

class IndexBody extends React.Component {

    render() {
        return (
            <div className="search-container w-100 d-flex align-items-center">
                <div className="text-center mx-auto">
                    <div className="w-100 m-auto">
                        <p className="title-text">Discover your perfect home</p>
                        <p className="title-content-text">With the most complete source of homes for sale & real estate near you</p>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Bao Loc city, Loc Tien sub-district"
                                aria-label="find-bds"
                                aria-describedby="basic-addon2"
                            />
                            <button className="btn btn-outline-danger bg-danger" type="button" id="button-addon2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </InputGroup>
                    </div>
                </div>
            </div>
        );
    }

}

export default IndexBody;