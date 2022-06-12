import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Generos from './Generos'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'

import Series from './Series'
import NovaSerie from './EditarSerie'
import InfoSerie from './InfoSerie'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/generos' element={<Generos />} />
        <Route exact path='/generos/novo' element={<NovoGenero />} />
        <Route exact path='/generos/:id' element={<EditarGenero />} />
        <Route exact path='/series' element={<Series />} />
        <Route exact path='/series/novo' element={<NovaSerie />} />
        <Route exact path='/series/:id' element={<InfoSerie />} />
      </Routes>
    </Router>
  )
}

export default App

