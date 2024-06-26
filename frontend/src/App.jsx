import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Laptops from './pages/laptops'
import Mobiles from './pages/mobiles'
import LoginUser from './pages/loginuser'
import Navbar from './components/Header'
import Footer from './components/Footer'
import ProductDetails from './pages/ProductDetails'
import UserProfile from './pages/UserDashboard/profile'
import SignupUser from './pages/signupuser'
import Orders from './pages/UserDashboard/orders'
import Cart from './pages/UserDashboard/cart'
import Wishlist from './pages/UserDashboard/wishlist'
import { useState,useEffect } from 'react'
import CheckoutPage from './pages/UserDashboard/checkout'
import SearchPage from './pages/search'
function App() {
  const [userAuth, setUserAuth] = useState(false);
  const [sellerAuth,setSellerAuth]=useState(false);
  const [cart,setCart]=useState(false);
  const [query,setQuery]=useState('');
  useEffect(()=>{fetch('/api/user').then((res)=>res.json()).then(data=>{
    if (data.status=='authenticated'){
        setUserAuth(data.user_id);
    } else {
        setUserAuth(false);
    }
})},[userAuth]);
  useEffect(()=>{},[cart]);
  return (
    <>
      <BrowserRouter>
      <Navbar userAuth={userAuth} setUserAuth={setUserAuth} cart={cart} setCart={setCart} query={query} setQuery={setQuery}/>
        <Routes>
          <Route path='/' element={<Home cart={cart} setCart={setCart} />}></Route>
          <Route path='/laptops' element={<Laptops cart={cart} setCart={setCart}/>}></Route>
          <Route path='/mobiles' element={<Mobiles cart={cart} setCart={setCart}/>}></Route>
          <Route path='/product/:id' element={<ProductDetails cart={cart} setCart={setCart}/>}></Route>
          <Route path='/login' element={<LoginUser/>}></Route>
          <Route path='/signup' element={<SignupUser/>}></Route>
          <Route path='/profile' element={<UserProfile/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
          <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>}></Route>
          <Route path='/wishlist' element={<Wishlist/>}></Route>
          <Route path='/checkout' element={<CheckoutPage/>}></Route>
          <Route path='/search' element={<SearchPage cart={cart} setCart={setCart} query={query} setQuery={setQuery}/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
