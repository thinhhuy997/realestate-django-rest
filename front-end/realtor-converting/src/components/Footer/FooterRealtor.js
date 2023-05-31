import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, FormControl, Button } from "react-bootstrap";
import '../Navbar/NavbarRealtor.scss';

class FooterRealtor extends React.Component {


    render() {
        return (
            // <!-- Header session -->
            <div className="bg-light p-3 mt-5">
                <Container>
                    <footer className='py-5'>
                        <Row>
                            <Col xs={12} md={4}>
                                <h5>Hướng dẫn</h5>
                                <ul className='nav flex-column'>
                                    <li className='nav-item mb-2'>Báo giá</li>
                                    <li className='nav-item mb-2'>Câu hỏi thường gặp</li>
                                    <li className='nav-item mb-2'>Thông báo</li>
                                    <li className='nav-item mb-2'>Liên hệ</li>
                                    <li className='nav-item mb-2'>Sitemap</li>
                                </ul>
                            </Col>
                            <Col xs={12} md={4}>
                                <h5>Quy định</h5>
                                <ul className='nav flex-column'>
                                    <li className='nav-item mb-2'>Quy định đăng tin</li>
                                    <li className='nav-item mb-2'>Quy chế hoạt động</li>
                                    <li className='nav-item mb-2'>Điều khoản thỏa thuận</li>
                                    <li className='nav-item mb-2'>Chính sách bảo mật</li>
                                    <li className='nav-item mb-2'>Giải quyết khiếu nại</li>
                                    <li className='nav-item mb-2'>Góp ý báo lỗi</li>
                                </ul>
                            </Col>
                            <Col xs={12} md={4}>
                                <h5>Đăng ký nhận tin</h5>
                                <Form>
                                    <Form.Group className='mb-3'>
                                        <Form.Label htmlFor="subcripleMail" className="visually-hidden">Email address</Form.Label>
                                        <FormControl type="text" id="subcripleMail" placeholder='Địa chỉ Email'></FormControl>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Check type="checkbox" label="Tôi đồng ý với các điều khoản"></Form.Check>
                                    </Form.Group>
                                    <Button size="sm" type="submit">Đăng ký</Button>
                                </Form>
                            </Col>
                        </Row>
                    </footer>
                </Container>
            </div>
            // {/* <!--Header session end--> */}

        );
    }

}

export default FooterRealtor;