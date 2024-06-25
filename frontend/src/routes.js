import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Logon from './pages/Logon';

export default function AllRoutes(){
    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Logon/>}/>            
            
            </Routes>
        </BrowserRouter>
    );
}