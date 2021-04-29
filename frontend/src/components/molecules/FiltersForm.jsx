import React from 'react'
import CategoriesSelect from "../atoms/CategoriesSelect";
import { Form, Input, Button } from 'antd';

function FiltersForm({onSet}) {
    const [form] = Form.useForm();

    function onFinish(filters) {
        const query = filters;

        if(!filters.titulo){
            delete query["titulo"];
        }

        if(!filters.categorias || filters.categorias?.length === 0){
            delete query["categorias"];
        }

        const params = new URLSearchParams(query);
        onSet(params);
    }

    return (
        <Form form={form} name="filters-form" onFinish={onFinish}>
            <Form.Item
                name={'titulo'}
                label="Filtrar por titulo"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name={'categorias'}
                label="Filtrar por categoria"
            >
                <CategoriesSelect />
            </Form.Item>

            <Form.Item style={{flexDirection: 'row-reverse', display: 'inline-flex'}}>
                <Button type="primary" htmlType="submit">
                    Filtrar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FiltersForm
