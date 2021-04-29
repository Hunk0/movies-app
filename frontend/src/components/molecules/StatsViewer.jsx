import React, { useState, useEffect } from 'react'
import { Rate, Divider, Button, Tooltip, Popover } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import FeedbackForm from "./FeedbackForm";
import axios from "axios";

function StatsViewer({peliculaId, seenMovies, onRate}) {
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if(loading || error){
            getData();
        }// eslint-disable-next-line
    }, [data, error, loading])

    
    function getData(){
        axios
        .get(`/peliculas/${peliculaId}/stats`)
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    function handleSendFeedback(calificacion){
        setLoading(true);

        axios
        .post(`/peliculas/${peliculaId}/stats`, {calificacion})
        .then(res => {
            onRate(peliculaId);
            getData();            
        })
        .catch(err => {
            console.log(err);
        })
    }

    if(loading) return "Cargando puntuaciones..."

    if(error) return "Ha ocurrido un problema al comunicarse con el servidor";

    return (
        <div style={{textAlign: 'center'}}>
            <p>{data.registros} usuarios han calificado esta pelicula, la puntuacion promedio es:</p>
            <Rate disabled value={data.calificacion} />
            {(!seenMovies.includes(peliculaId))&&(
                <React.Fragment>
                    <Divider />

                    <Tooltip placement="left" title="Marcar como vista y calificar">
                        <Popover 
                            content={<FeedbackForm onSubmit={handleSendFeedback}/>} 
                            title="Calificar pelicula" 
                            trigger="click"
                        >
                            <Button type="dashed" shape="circle" icon={<CheckOutlined />} />
                        </Popover>
                    </Tooltip>
                </React.Fragment>
            )}
        </div>
    )
}

export default StatsViewer
