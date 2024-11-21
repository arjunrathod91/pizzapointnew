import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Outlet from './pages/Outlet/Outlet'
import Menu from './pages/Menu/Menu'
import Offers from './pages/Offers/Offers'
import Footer from './components/Footer/Footer'
import Admin from './pages/Admin/Admin'
import { MyContextProvider } from './context/Context'
import Cart from './pages/Cart/Cart'
import Login from './pages/Profile/Login'
import Signup from './pages/Profile/Signup'
import Profile from './pages/Profile/Profile'
import PaymentMethod from './pages/Cart/PaymentMethod'
import OrderPlaced from './pages/Cart/OrderPlaced'

function App() {
  return (
    <div>
      <MyContextProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/outlet' element={<Outlet/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/offers' element={<Offers/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/paymentmethod' element={<PaymentMethod/>}/>
        <Route path='/orderplaced' element={<OrderPlaced/>}/>
      </Routes>
      </BrowserRouter>
      </MyContextProvider>
    </div>
  )
}

export default App

