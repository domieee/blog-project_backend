import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blogpage from './pages/Blogpage/Blogpage';
import Landingpage from './pages/Landingpage/Landingpage';


function App() {
  fetch('http://localhost:8080')
    .then(res => res.text())
    .then(data => {
      console.log(data);
    })

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/post/:id' element={<Blogpage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
