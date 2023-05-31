import React, {useState} from 'react';
import {Button, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import Slider from "@material-ui/core/Slider";
import IconArea from "../../Icons/IconArea";
import IconWidthFacade from "../../Icons/IconWidthFacade";
import IconDirection from "../../Icons/IconDirection";
import IconCash from "../../Icons/IconCash";
import IconWidthRoad from "../../Icons/IconWidthRoad";
import IconLegal from "../../Icons/IconLegal";
import IconBedroom from "../../Icons/IconBedroom";
import IconToilet from "../../Icons/IconToilet";

function FilterForm(props) {

    const {onFilterChanged, filter} = props;

    const [exportFilter, setExportFilter] = useState(filter);

    const [searchKey, setSearchKey] = useState("")
    const [price, setPrice] = useState([500000000, 50000000000]);
    const [convertedPrice, setConvertedPrice] = useState(["500,000,000", "50,000,000,000"])
    const [areaByM2, setAreaByM2] = useState([50, 200]);
    const [facade, setFacade] = useState([5, 20]);
    const [widthRoad, setWidthRoad] = useState([5, 20]);
    const [bedroom, setBetroom] = useState([1, 10]);
    const [toilet, setToilet] = useState([1, 10]);
    const [isLegal, setIsLegal] = useState("");
    const [direction, setDirection] = useState("");


    const handleOnGiaChange = (event, newValue) => {
        setPrice(newValue);
        setConvertedPrice([newValue[0].toLocaleString(), newValue[1].toLocaleString()])
        setExportFilter({
            ...exportFilter,
            min_price: newValue[0] / 1000000000,
            max_price: newValue[1] / 1000000000,
        })
    };

    const handleOnDienTichChange = (event, newValue) => {
        setAreaByM2(newValue);
        setExportFilter({
            ...exportFilter,
            min_area: newValue[0],
            max_area: newValue[1],
        })
    }

    const handleOnMatTienChange = (event, newValue) => {
        setFacade(newValue);
        setExportFilter({
            ...exportFilter,
            min_mattien: newValue[0],
            max_mattien: newValue[1],
        })
    }

    const handleOnDuongVaoChange = (event, newValue) => {
        setWidthRoad(newValue);
        setExportFilter({
            ...exportFilter,
            min_duongvao: newValue[0],
            max_duongvao: newValue[1],
        })
    }

    const handleOnBedroomChange = (event, newValue) => {
        setBetroom(newValue);
        setExportFilter({
            ...exportFilter,
            min_bedroom: newValue[0],
            max_bedroom: newValue[1],
        })
    }

    const handleOnToiletChange = (event, newValue) => {
        setToilet(newValue);
        setExportFilter({
            ...exportFilter,
            min_toilet: newValue[0],
            max_toilet: newValue[1],
        })
    }

    function handleLegalsChange(newValue) {
        // console.log(newValue)
        // setIsLegal(newValue)
        setExportFilter({
            ...exportFilter,
            phap_ly: newValue,
        })
    }

    function handleDirectionChange(newValue) {
        // console.log(newValue)
        // setDirection(newValue)
        setExportFilter({
            ...exportFilter,
            huong_nha: newValue,
        })
    }

    function handleRegionChange(event) {
        // console.log(event.target.value)
        // setDirection(newValue)
        setExportFilter({
            ...exportFilter,
            region: event.target.value,
        })
    }

    function handleKeySearchChange(event) {
        setExportFilter({
            ...exportFilter,
            search: event.target.value,
        })
    }

    function handleSubmit(newFiltersValues) {
        // console.log("Submit clicked")
        onFilterChanged(newFiltersValues)
    }

    return (
        <Container>
            {/*Region*/}
            <Row className="mt-2">
                <Form className="mb-3">
                    <FormGroup>
                        {/*<Form.Label htmlFor="">Tìm kiếm</Form.Label>*/}
                        {/*<Form.Control*/}
                        {/*    type='text'*/}
                        {/*    placeholder=''*/}
                        {/*    onChange={handleKeySearchChange}*/}
                        {/*/>*/}
                        <InputGroup>
                            <InputGroup.Text id="btnSearch">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"
                                     className="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm"
                                aria-label="Input group example"
                                aria-describedby="btnGroupAddon"
                                onChange={handleKeySearchChange}
                            />
                        </InputGroup>
                    </FormGroup>
                    <hr/>

                    <FormGroup>
                        <Form.Label htmlFor=""><IconArea/> Khu vực </Form.Label>
                        <Form.Select aria-label="Default select example" onChange={handleRegionChange}>
                            <option>Khu vực</option>
                            <option value="1">Lạc Dương</option>
                            <option value="2">Bảo Lâm</option>
                            <option value="3">Bảo Lộc</option>
                            <option value="4">Đà Lạt</option>
                            <option value="5">Đức Trọng</option>
                            <option value="6">Đạ Huoai</option>
                            <option value="7">Di Linh</option>
                            <option value="8">Đơn Dương</option>
                            <option value="9">Lâm Hà</option>
                            <option value="10">Đạ Tẻh</option>
                            <option value="12">Cát Tiên</option>
                        </Form.Select>
                    </FormGroup>

                    {/*<FormGroup>*/}
                    {/*    <Form.Label><IconDirection/> Hướng nhà</Form.Label> handleDirectionChange*/}
                    {/*    <Form.Check type="checkbox" id="checkboxNorth" label="Bắc"*/}
                    {/*                onChange={() => handleDirectionChange("Bắc")}/>*/}
                    {/*    <Form.Check type="checkbox" id="checkboxEastNorth" label="Đông - Bắc"*/}
                    {/*                onChange={() => handleDirectionChange("Đông - Bắc")}/>*/}
                    {/*    <Form.Check type="checkbox" id="checkboxEast" label="Đông"*/}
                    {/*                onChange={() => handleDirectionChange("Đông")}/>*/}
                    {/*    <Form.Check type="checkbox" id="checkboxSouthEast" label="Đông - Nam"*/}
                    {/*                onChange={() => handleDirectionChange("Đông - Nam")}/>*/}
                    {/*    <Form.Check type="checkbox" id="checkboxSouth" label="Nam"*/}
                    {/*                onChange={() => handleDirectionChange("Nam")}/>*/}
                    {/*    <Form.Check type="checkbox" id="checkboxSoutwest" label="Tây - Nam"*/}
                    {/*                onChange={() => handleDirectionChange("Tây - Nam")}/>*/}
                    {/*    <Form.Check type="checkbox" id="checkboxWest" label="Tây"*/}
                    {/*                onChange={() => handleDirectionChange("Tây")}/>*/}
                    {/*    <Form.Check type="checkbox" id="checkboxNorthwest" label="Tây - Bắc"*/}
                    {/*                onChange={() => handleDirectionChange("Tây - Bắc")}/>*/}
                    {/*</FormGroup>*/}

                </Form>
                <hr/>
            </Row>
            {/*Area*/}
            <Row className="mt-2">
                <Form className="mb-3">
                    <FormGroup>
                        <Form.Label htmlFor=""><IconArea/> Diện tích </Form.Label>
                        <Slider
                            min={50}
                            max={200}
                            value={areaByM2}
                            onChange={handleOnDienTichChange}
                            // valueLabelDisplay="auto"
                        />
                        <Form.Text>{areaByM2[0]} m<sup>2</sup> tới {areaByM2[1]} m<sup>2</sup> </Form.Text>
                    </FormGroup>
                </Form>
                <hr/>
            </Row>
            {/*Price*/}
            <Row className="mt-2">
                <Form className="mb-3">
                    <FormGroup>
                        <Form.Label htmlFor=""><IconCash/> Giá</Form.Label>
                        <Slider
                            min={500000000}
                            max={50000000000}
                            step={100000000}
                            value={price}
                            onChange={handleOnGiaChange}
                            // valueLabelDisplay="auto"
                        />
                        <Form.Text>{convertedPrice[0]} tới {convertedPrice[1]}</Form.Text>
                    </FormGroup>
                </Form>
                <hr/>
            </Row>
            {/*Facade*/}
            <Row className="mt-2">
                <Form className="mb-3">
                    <FormGroup>
                        <Form.Label htmlFor=""><IconWidthFacade/> Mặt tiền</Form.Label>
                        <Slider
                            min={5}
                            max={20}
                            step={5}
                            value={facade}
                            onChange={handleOnMatTienChange}
                            // valueLabelDisplay="auto"
                        />
                        <Form.Text>{facade[0]} m tới {facade[1]} m</Form.Text>
                    </FormGroup>
                </Form>
                <hr/>
            </Row>
            {/*WidthRoad*/}
            <Row className="mt-2">
                <Form className="mb-3">
                    <FormGroup>
                        <Form.Label htmlFor=""><IconWidthRoad/> Bề ngang đường vào</Form.Label>
                        <Slider
                            min={5}
                            max={20}
                            step={5}
                            value={widthRoad}
                            onChange={handleOnDuongVaoChange}
                            // valueLabelDisplay="auto"
                        />
                        <Form.Text>{widthRoad[0]} m tới {widthRoad[1]} m</Form.Text>
                    </FormGroup>
                </Form>
                <hr/>
            </Row>
            {/*Bedroom*/}
            <Row className="mt-2">
                <Form className="mb-3">
                    <FormGroup>
                        <Form.Label htmlFor=""><IconBedroom/> Phòng ngủ </Form.Label>
                        <Slider
                            min={1}
                            max={10}
                            step={1}
                            value={bedroom}
                            onChange={handleOnBedroomChange}
                            // valueLabelDisplay="auto"
                        />
                        <Form.Text>{bedroom[0]} phòng tới {bedroom[1]} phòng</Form.Text>
                    </FormGroup>
                </Form>
                <hr/>
            </Row>
            {/*Toilet*/}
            <Row className="mt-2">
                <Form className="mb-3">
                    <FormGroup>
                        <Form.Label htmlFor=""><IconToilet/> Toilet </Form.Label>
                        <Slider
                            min={1}
                            max={10}
                            step={1}
                            value={toilet}
                            onChange={handleOnToiletChange}
                            // valueLabelDisplay="auto"
                        />
                        <Form.Text>{toilet[0]} phòng tới {toilet[1]} phòng</Form.Text>
                    </FormGroup>
                </Form>
                <hr/>
            </Row>
            {/*Direction*/}
            <Row className="mt-2">
                <Form className="mb-3">
                    <FormGroup>
                        <Form.Label><IconDirection/> Hướng nhà</Form.Label> handleDirectionChange
                        <Form.Check type="checkbox" id="checkboxNorth" label="Bắc"
                                    onChange={() => handleDirectionChange("Bắc")}/>
                        <Form.Check type="checkbox" id="checkboxEastNorth" label="Đông - Bắc"
                                    onChange={() => handleDirectionChange("Đông - Bắc")}/>
                        <Form.Check type="checkbox" id="checkboxEast" label="Đông"
                                    onChange={() => handleDirectionChange("Đông")}/>
                        <Form.Check type="checkbox" id="checkboxSouthEast" label="Đông - Nam"
                                    onChange={() => handleDirectionChange("Đông - Nam")}/>
                        <Form.Check type="checkbox" id="checkboxSouth" label="Nam"
                                    onChange={() => handleDirectionChange("Nam")}/>
                        <Form.Check type="checkbox" id="checkboxSoutwest" label="Tây - Nam"
                                    onChange={() => handleDirectionChange("Tây - Nam")}/>
                        <Form.Check type="checkbox" id="checkboxWest" label="Tây"
                                    onChange={() => handleDirectionChange("Tây")}/>
                        <Form.Check type="checkbox" id="checkboxNorthwest" label="Tây - Bắc"
                                    onChange={() => handleDirectionChange("Tây - Bắc")}/>
                    </FormGroup>
                </Form>
                <hr/>
            </Row>
            {/*Legal*/}
            <Row className="mt-2">
                <Form className="mb-3">
                    <FormGroup>
                        <Form.Label><IconLegal/> Hợp pháp</Form.Label>
                        <Form.Check type="checkbox" id="checkboxLegal" label="Sổ đỏ/ Sổ hồng"
                                    onChange={() => handleLegalsChange("Sổ đỏ/ Sổ hồng")}/>
                    </FormGroup>
                </Form>
                <hr/>
            </Row>
            <Button variant="outline-primary" type="submit" className="w-100"
                    onClick={() => handleSubmit(exportFilter)}>
                Áp dụng
            </Button>
        </Container>
    );
}

export default FilterForm;