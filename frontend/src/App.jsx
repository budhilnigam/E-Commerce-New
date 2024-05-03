import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Laptops from './pages/laptops'
import Mobiles from './pages/mobiles'
import LoginUser from './pages/loginuser'
import { Navbar } from './components/Header'
import ProductDetails from './pages/ProductDetails'
import UserProfile from './pages/UserDashboard/profile'
import SignupUser from './pages/signupuser'
import Orders from './pages/UserDashboard/orders'
import Cart from './pages/UserDashboard/cart'
import Wishlist from './pages/UserDashboard/wishlist'
import { useState,useEffect } from 'react'
import CheckoutPage from './pages/UserDashboard/checkout'
function App() {
  const [userAuth, setUserAuth] = useState(false)
  const [sellerAuth,setSellerAuth]=useState(false)
  useEffect(()=>{fetch('/api/user').then((res)=>res.json()).then(data=>{
    if (data.status=='authenticated'){
        setUserAuth(data.user_id);
    } else {
        setUserAuth(false);
    }
})}
,[userAuth])
  return (
    <>
      <BrowserRouter>
      <Navbar userAuth={userAuth} setUserAuth={setUserAuth}/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/laptops' element={<Laptops/>}></Route>
          <Route path='/mobiles' element={<Mobiles/>}></Route>
          <Route path='/product/:id' element={<ProductDetails/>}></Route>
          <Route path='/login' element={<LoginUser/>}></Route>
          <Route path='/signup' element={<SignupUser/>}></Route>
          <Route path='/profile' element={<UserProfile/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/wishlist' element={<Wishlist/>}></Route>
          <Route path='/checkout' element={<CheckoutPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
