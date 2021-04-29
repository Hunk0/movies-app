import React, { useState } from 'react'
import { Image, Button, Drawer, Row, Col, Tag, Divider } from 'antd';
import StatsViewer from "../molecules/StatsViewer";


function MovieDetailsModal({Launcher, ...props}) {
    const [showModal, setShowModal] = useState(false);

    const {peliculaId, titulo, descripcion, trailerUrl, duracion, estreno, caratula, categorias} = props;

    function handleShow(){
        setShowModal(!showModal)
    }

    return (
        <div>
            {React.cloneElement(Launcher, { onClick:handleShow })}

            <Drawer
                title="Detalles"
                width={window.innerWidth > 900 ? 700 : "90%"}
                onClose={handleShow}
                visible={showModal}
                bodyStyle={{ paddingBottom: 80 }}
                footer={null}
                placement="left"
            >
                {categorias?.map(categoria => <Tag key={categoria.categoriaId}>{categoria.nombre}</Tag>)}
                <br/><br/>
                <Row gutter={8}>
                    <Col xs={24} sm={8} style={{textAlign: "center"}}>
                        <Image
                            width="90%"
                            src={`${process.env.REACT_APP_API}/img/${caratula}`}
                            placeholder={
                                <Image
                                    preview={false}
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                                    width={200}
                                />
                            }
                        />
                        <br/>
                        <Button type="link" href={trailerUrl} target="_blank" rel="noopener noreferrer">
                            Ver trailer
                        </Button>
                    </Col>
                    <Col xs={24} sm={16}>
                        <h1>{titulo}</h1>
                        <p>Descripcion: {descripcion}</p>
                        <p>Duracion: {duracion}</p>
                        <p>Estreno: {estreno}</p>
                        <Divider />
                        <StatsViewer peliculaId={peliculaId} {...props}/>
                        <Divider />
                    </Col>
                </Row>
            </Drawer>
        </div>
    )
}

export default MovieDetailsModal
