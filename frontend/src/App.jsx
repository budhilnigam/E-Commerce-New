import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'
import Home from './pages/home'
import LoginUser from './pages/loginuser'
import SignupUser from './pages/signupuser'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<LoginUser/>}></Route>
          <Route path='/signup' element={<SignupUser/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
