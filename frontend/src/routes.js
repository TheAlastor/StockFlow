import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Logon from './pages/Logon';
import Register from './pages/Register';
import Request from './pages/Request';
import Menu from './pages/Menu';

export default function AllRoutes(){
    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Logon/>}/>            
            <Route path="/register" element={<Register/>}/>
            <Route path="/menu" element={<Menu/>}/> 
            <Route path="/request" element={<Request/>}/> 
            </Routes>
        </BrowserRouter>
    );
}