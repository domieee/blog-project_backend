import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blogpage from './pages/Blogpage/Blogpage';
import { useEffect, useState } from 'react';
import Landingpage from './pages/Landingpage/Landingpage';
import './reset.scss'
import Editorpage from './pages/Editorpage/Editorpage';
import Navigation from './components/Navigation/Navigation';


function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080')
      .then(res => res.json())
      .then(data => {
        console.log(data, '123123');
        setPosts(data)
      })
  }, [])

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Landingpage data={posts} />} />
        <Route path='/posts/:id/' element={<Blogpage posts={posts} />} />
        <Route path='/editor/' element={<Editorpage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
