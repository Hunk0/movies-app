import React, { useState } from 'react';
import NavBar from "./molecules/NavBar";
import FeaturedList from "./organism/FeaturedList";
import AllResultsList from "./organism/AllResultsList";
import Layout from 'antd/es/layout';
import axios from "axios";

const { Content } = Layout;

axios.defaults.baseURL = process.env.REACT_APP_API;

function App() {
  const [addedMovies, setAddedMovies] = useState([]);
  const [seenMovies, setSeenMovies] = useState(localStorage.getItem('myMovies') ? JSON.parse(localStorage.getItem('myMovies')) : []);

  function handleAdd(newMovie){
    setAddedMovies([...addedMovies, newMovie]);


    /*

    const estrenodate = new Date(`${estreno} 12:00:00`);
    const actualdate = new Date();

    const diff =(actualdate.getTime() - estrenodate.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7);

    if(Math.abs(Math.round(diff)) <= 21){

    }*/
  }

  function handleMarkAsSeen(pid){
    const myList = [...seenMovies, pid];

    setSeenMovies(myList);
    localStorage.setItem('myMovies', JSON.stringify(myList));
  }

  return (
    <React.Fragment>
      <NavBar onAdd={handleAdd}/>
      <Content style={{ padding: '24px 50px', minHeight: '90vh' }}>
          <FeaturedList addedMovies={addedMovies}/>
          <br/><br/>
          <AllResultsList seenMovies={seenMovies} addedMovies={addedMovies} onRate={handleMarkAsSeen}/>
      </Content>
    </React.Fragment>
  );
}

export default App;
