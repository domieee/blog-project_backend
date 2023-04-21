import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blogpage from './pages/Blogpage/Blogpage';
import { useEffect, useState } from 'react';
import Landingpage from './pages/Landingpage/Landingpage';
import './reset.scss'
import Editorpage from './pages/Editorpage/Editorpage';
import Navigation from './components/Navigation/Navigation';
import Login from './pages/UserValidation/Login';
import Register from './pages/UserValidation/Register';


function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND}/`)
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
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/posts/:id/' element={<Blogpage posts={posts} />} />
        <Route path='/editor/' element={<Editorpage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
