import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Laptops from './pages/laptops'
import Mobiles from './pages/mobiles'
import LoginUser from './pages/loginuser'
import { Navbar } from './components/Header'
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/laptops' element={<Laptops/>}></Route>
          <Route path='/mobiles' element={<Mobiles/>}></Route>
          <Route path='/login' element={<LoginUser/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
