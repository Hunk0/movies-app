import React from 'react'
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import AddMovieModal from "../organism/AddMovieModal";
const { Header } = Layout;

function NavBar(props) {
    return (
        <Header className="header">
            <Row justify="space-between">
                <Col>
                    <h2 style={{ float: 'left', color: 'white' }}>Plataforma de películas</h2>
                </Col>
                <Col>
                    <AddMovieModal {...props}/>
                </Col>
            </Row>
        </Header>
    )
}

export default NavBar
