import React from 'react'
import { Form, Rate, Button } from 'antd';

function FeedbackForm({peliculaId, onSubmit}) {
    const [form] = Form.useForm();

    function onFinish({calificacion}) {
        onSubmit(calificacion);
    }

    return (
        <Form form={form} name="filters-form" onFinish={onFinish}>
            <Form.Item
                name={'calificacion'}
                label="Que te parecio esta pelicula?"
            >
                <Rate />
            </Form.Item>

            <Form.Item style={{flexDirection: 'row-reverse', display: 'inline-flex'}}>
                <Button type="primary" htmlType="submit">
                    Enviar calificacion
                </Button>
            </Form.Item>
        </Form >
    )
}

export default FeedbackForm
