import './App.css'
import { Routes, Route } from "react-router-dom"
import { Home, FormPage } from './pages/index'
import Layout from './Layout'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:4000"
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<FormPage />} />
        <Route path="/register" element={<FormPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
