import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import DetailProduct from './components/DetailProduct/DetailProduct';
import Shop from './components/Shop/Shop';
import Cart from './components/Cart/Cart';
import CreateProduct from './components/ProductManager/CreateProduct';
import Profile from './components/Profile/Profile';
import ProductManager from './components/ProductManager/ProductManager';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/detail-product' element={<DetailProduct />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/create-product' element={<CreateProduct />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/product-manager' element={<ProductManager />} />
      <Route path='/product-manager/product-create' element={<CreateProduct />} />
      
    </Routes>
  );
}

export default App;
