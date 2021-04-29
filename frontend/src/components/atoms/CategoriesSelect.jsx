import React, { useState, useEffect } from 'react'
import { Select } from 'antd';
import axios from "axios";

const { Option } = Select;

function CategoriesSelect({ value = [], onChange }) {
    const [options, setSptions] = useState(undefined);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(!options || error){
            axios
            .get('/categorias')
            .then(res => {
                setSptions(res.data);
                console.log(res.data);
            })
            .catch(err => {
                setError(true);
            })
        }
    }, [options, error])

    if(!options) return "Cargando...";

    if(error) return "Ha ocurrido un problema al comunicarse con el servidor";

    return (
        <span>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Elige las categorias de esta pelicula"
                defaultValue={[]}
                onChange={onChange}
            >
                {options.map(option => <Option key={option.categoriaId}>{option.nombre}</Option>)}
            </Select>
        </span>
    )
}

export default CategoriesSelect
