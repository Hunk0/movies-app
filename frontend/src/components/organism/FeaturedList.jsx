import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import NewMovieCard from "../molecules/NewMovieCard";
import axios from "axios";

const contentStyle = {
    display: 'flex',
    overflow: 'auto',
    paddingBottom: 20
}

function FeaturedList({addedMovies}) {
    const [items, setItems] = useState(undefined);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(!items || error){
            axios
            .get('/novedades')
            .then(res => {
                setItems(res.data);
            })
            .catch(err => {
                setError(true);
            })
        }
    }, [items, error])

    if(!items) return (
        <Card title="Novedades 🎬">
            {Array.apply(0, Array(4)).map((item, index) => <NewMovieCard key={index}/>)}
        </Card>
    )

    if(error) return "Ha ocurrido un problema al comunicarse con el servidor";

    return (
        <Card title="Novedades 🎬">
            <div style={contentStyle}>
                {items.map(item => <NewMovieCard key={item.peliculaId} {...item}/> )}
                {addedMovies.filter(item =>  {
                    const estrenodate = new Date(`${item.estreno} 12:00:00`);
                    const actualdate = new Date();
                
                    let diff =(actualdate.getTime() - estrenodate.getTime()) / 1000;
                    diff /= (60 * 60 * 24 * 7);
                
                    return (Math.abs(Math.round(diff)) <= 21)
                }).map(item => <NewMovieCard key={item.peliculaId} {...item}/>)}
            </div>
        </Card>
    )
}

export default FeaturedList
