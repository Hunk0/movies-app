import React, { useState, useEffect } from 'react'
import { Card, Divider, Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import MovieCard from "../molecules/MovieCard";
import FiltersForm from "../molecules/FiltersForm";
import axios from "axios";

const contentStyle = {
    display: 'grid',
    paddingBottom: 20
}

const { SubMenu } = Menu;

function AllResultsList({addedMovies, ...props}) {
    const [items, setItems] = useState(undefined);
    const [error, setError] = useState(false);
    const [useFilters, setUseFilters] = useState(false);

    useEffect(() => {
        if(!items || error){
            getItems()
        }
    }, [items, error])

    function handleFilter(query){
        getItems(`?${query}`);
        setUseFilters(Boolean(query));
    }

    function getItems(query){
        axios
        .get(`/lista${query || ""}`)
        .then(res => {
            setItems(res.data);
        })
        .catch(err => {
            setError(true);
        })
    }


    if(!items) return (
        <Card title={useFilters?"Resultados...":"Todas las peliculas"}>
            {Array.apply(0, Array(4)).map((item, index) => <MovieCard key={index}/>)}
        </Card>
    )

    if(error) return "Ha ocurrido un problema al comunicarse con el servidor";

    return (
        <Card 
            style={contentStyle} 
            title={useFilters?"Resultados...":"Todas las peliculas"}
            extra={`${items.length} resultados`}
        >   
            <Menu mode="inline" style={{borderRight: 0}}>
                <SubMenu style={{background: '#fff'}} icon={<AppstoreOutlined />} title="Filtrar resultados">
                    <FiltersForm onSet={handleFilter}/>
                </SubMenu>
            </Menu>
            <Divider />
            
            {items.map(item => <MovieCard key={item.peliculaId} {...item} {...props}/> )}
            {addedMovies.map(item => <MovieCard key={item.peliculaId} {...item} {...props}/> )}
        </Card>
    )
}

export default AllResultsList
