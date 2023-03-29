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
        console.log(posts.length);
      })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage posts={posts} />} />
        <Route path='/post/:id' element={<Blogpage posts={posts} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
