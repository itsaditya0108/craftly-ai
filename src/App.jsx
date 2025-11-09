import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import NoPage from './pages/NoPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
