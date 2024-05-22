
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './users/Register'
import Home  from './others/Home';
import Login from './users/Login'
import { Dispatcher } from './panel/Dispatcher';
import React from 'react'
import backgroundImage from "/oilbg6.jpg";
import { Products } from './products/products';
// import { Orders } from './dashboard/orders';
import { ProductsList } from './products/productsList'; 


function App() {


  return (
  
  //  <div  className="flex flex-col items-center justify-center h-screen"
   
  //  style={{
  //   backgroundImage: `url(${backgroundImage})`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   // Optional: Ensures background stays fixed while content scrolls
  //   backgroundAttachment: "fixed",
  // }}>

    <Router>
   <Routes>
     <Route path="/register" element={<Register />} />
     <Route path="/login" element={<Login />} />
     <Route path='/' element={<Home/>}/>
     <Route path='/dispatcher' element={<Dispatcher/>}/>
      <Route path="products" element={<Products />} />
     <Route path='/products' element={<Products/>}/>
     {/* <Route path='/productList' element={<ProductsList/>}/> */}
   </Routes>
   </Router>
  //  </div>
    
  )
}

export default App
