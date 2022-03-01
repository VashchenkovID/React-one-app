import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Posts from './Pages/posts';
import About from './Pages/About';



function App() {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/posts" element={<Posts />}></Route>
            <Route path="/about" element={<About />}></Route>
        </Routes>
        <Link to="/posts">Посты</Link>
        <Link to="/about">История</Link>
        </BrowserRouter>


    )
}

export default App;
