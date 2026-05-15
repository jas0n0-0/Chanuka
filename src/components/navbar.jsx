import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Trending from '../pages/trending'
import Home from '../pages/home'
import Saved from '../pages/saved'
import Login from '../pages/login'
import NotFound from '../pages/NotFound'


function Navbar (){
    return(
        <>
        <h1>CHANUKA SAHII</h1>
     <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/trending">Trending</Link></li>
          <li><Link to="/saved">Saved</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
        </>
    )
}


export default Navbar;