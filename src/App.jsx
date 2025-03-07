import React from 'react'
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Menu from './Components/Menu'
import Order from './Components/Order'
import ETA from './Components/ETA'
import Receipt from './Components/Receipt'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Menu />} />
            <Route path='/order' element={<Order />} />
            <Route path='/eta' element={<ETA />} />
            <Route path='/receipt' element={<Receipt />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App