import React, { useState } from 'react'
import { Drawer, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MovieForm from "../molecules/MovieForm";

function AddMovieModal({Launcher, onAdd}) {
    const [showModal, setShowModal] = useState(false)

    function handleShow(){
        setShowModal(!showModal)
    }

    function handleAdd(movie){
        onAdd(movie);
        setShowModal(false);
    }

    return (
        <div>
            {React.cloneElement(Launcher, { onClick:handleShow })}

            <Drawer
                title="Agregar una pelicula"
                width={720}
                onClose={handleShow}
                visible={showModal}
                bodyStyle={{ paddingBottom: 80 }}
                footer={null}
                destroyOnClose
            >
                <MovieForm onSuccess={handleAdd}/>
            </Drawer>
        </div>
    )
}

AddMovieModal.defaultProps = {
    Launcher: (
        <Button type="primary">
            <PlusOutlined /> Agregar pelicula
        </Button>
    ),
    onAdd: () => {}
}

export default AddMovieModal
