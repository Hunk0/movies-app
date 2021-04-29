import React from 'react'
import { Form, Input, Button, Divider, TimePicker, DatePicker } from 'antd';
import Uploader from "../atoms/Uploader";
import CategoriesSelect from "../atoms/CategoriesSelect";
import axios from "axios";

function MovieForm({onSuccess}) {
    const [form] = Form.useForm();

    const onFinish = ({caratula, pelicula}) => {
        const newPelicula = {
            ...pelicula,
            duracion: pelicula.duracion.format('HH:mm:ss'),
            estreno: pelicula.estreno.format('YYYY-MM-DD'),
        }
        
        let formData = new FormData();
        formData.append("caratula", caratula);
        formData.append("pelicula", JSON.stringify(newPelicula));

        axios
        .post(`/crear`, formData, { headers:{ 'Content-Type': 'multipart/form-data' } })
        .then(res => {
            onSuccess(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    };

    return (
        <Form form={form} name="pelicula-form" onFinish={onFinish}>
            <Form.Item
                name={['pelicula', 'titulo']}
                label="Titulo"
                rules={[{ required: true, message: "Este campo es requerido" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item 
                name={['pelicula', 'descripcion']} 
                label="Descripcion"
                initialValue=""
                rules={[
                    { required: true, message: "Este campo es requerido" },
                    { validator: (_, value) => value.length < 120 ? Promise.resolve() : Promise.reject(new Error('Se ha superado el limite de caracteres permitido (120)')) }
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                name={['pelicula', 'trailerUrl']}
                initialValue=""
                label="Trailer"
                rules={[
                    { required: true, message: "Este campo es requerido" },
                    { validator: (_, value) => /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value) ? Promise.resolve() : Promise.reject(new Error('Esta url no es valida')) },
                    { validator: (_, value) => value.includes("youtube.com") ? Promise.resolve() : Promise.reject(new Error('Esta url no es de Youtube')) }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name={['pelicula', 'duracion']}
                label="Duracion"
                rules={[
                    { required: true, message: "Este campo es requerido" }
                ]}
            >
                <TimePicker placeholder=""/>
            </Form.Item>

            <Form.Item
                name={['pelicula', 'estreno']}
                label="Estreno"
                rules={[
                    { required: true, message: "Este campo es requerido" }
                ]}
            >
                <DatePicker placeholder=""/>
            </Form.Item>

            <Form.Item 
                name={['caratula']}
                label="Caratula"
                rules={[
                    { required: true, message: "Este campo es requerido" }
                ]}
            >
                <Uploader />
            </Form.Item>

            <Form.Item
                name={['pelicula', 'categorias']}
                label="Categorias"
                rules={[
                    { required: true, message: "Este campo es requerido" }
                ]}
            >
                <CategoriesSelect />
            </Form.Item>

            <Divider />

            <Form.Item style={{flexDirection: 'row-reverse', display: 'inline-flex'}}>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default MovieForm
