
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './users/Register'
import Home  from './others/Home';
import Login from './users/Login'
import { Dispatcher } from './panel/Dispatcher';
import { ProductEdit } from './products/productEdit';
import { ProductView } from './products/productView';
import ProductDelete from './products/productDelete';
import PrivateRoute from './users/PrivateRoute';
import PublicRoute from './users/PublicRoute';
import { OrderAdd } from './orders/orderAdd';
import { TraderOders } from './orders/TraderOders';
import { TraderDashboard } from './panel/TraderDashboard';


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/register" element={<PublicRoute>
          <Register />
        </PublicRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='traderdashboard' element={<TraderDashboard/>}></Route>
        <Route path='/dispatcher'
          element={<PrivateRoute>
            <Dispatcher />
          </PrivateRoute>} />
        <Route path='/editProduct/:productId' element={<ProductEdit />} />
        <Route path='/viewProduct/:productId' element={<ProductView />} />
        <Route path='/deleteProduct/:productId' element={<ProductDelete />} />
        {/* <Route path='/createOrder' element={<OrderAdd />} /> */}

        <Route path='traderOrders' element={<TraderOders />} />

        {/* <Route path='/productList' element={<ProductsList/>}/> */}
      </Routes>
    </Router>
  )
}

export default App
