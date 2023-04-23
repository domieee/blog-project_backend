import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blogpage from './pages/Blogpage/Blogpage';
import { useEffect, useState } from 'react';
import Landingpage from './pages/Landingpage/Landingpage';
import './reset.scss'
import Editorpage from './pages/Editorpage/Editorpage';
import Navigation from './components/Navigation/Navigation';
import Login from './pages/UserValidation/Login';
import Register from './pages/UserValidation/Register';
import Protect from './components/Protect';


function App() {

  const [posts, setPosts] = useState([])
  const [user, setUser] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND}/`)
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
  }, [])


  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Landingpage user={user} data={posts} />} />
        <Route element={<Protect />}>
          <Route path='/editor' element={<Editorpage />} />
        </Route>
        <Route path='/login' element={<Login user={user} setUser={setUser} />} />
        <Route path='/register' element={<Register user={user} setUser={setUser} />} />
        <Route path='/posts/:id' element={<Blogpage posts={posts} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
