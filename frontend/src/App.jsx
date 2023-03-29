import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blogpage from './pages/Blogpage/Blogpage';
import { useEffect, useState } from 'react';
import Landingpage from './pages/Landingpage/Landingpage';
import './reset.scss'


function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage data={posts} />} />
        <Route path='/posts/:id/' element={<Blogpage data={posts} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
