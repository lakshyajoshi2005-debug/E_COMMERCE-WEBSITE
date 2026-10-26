import ProductList from "./pages/ProductList";
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import ProductDetails from './pages/ProductDetails'; 
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';                                  
import PrivateRouter from './components/PrivateRouter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyOrders from "./pages/Myorders";

function App(){
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route element={<PrivateRouter/>}>
          <Route path="/checkout" element={<CheckoutPage/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route element={<PrivateRouter />}>
        <Route path="/my-orders" element={<MyOrders />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
