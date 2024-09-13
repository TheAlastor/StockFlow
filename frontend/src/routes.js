import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Logon from './pages/Logon';
import Register from './pages/Register';
import Requests from './pages/Requests';
import Menu from './pages/Menu';
import NewRequest from './pages/NewRequest'

export default function AllRoutes(){
    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Logon/>}/>            
            <Route path="/register" element={<Register/>}/>
            <Route path="/menu" element={<Menu/>}/> 
            <Route path="/requests" element={<Requests/>}/> 
            <Route path="/NewRequest" element={<NewRequest/>}/>
            </Routes>
        </BrowserRouter>
    );
}