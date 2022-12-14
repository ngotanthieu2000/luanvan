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
import UserManager from './components/UserManager/UserManager';
import Order from './components/OrderManager/Order';
import NotFoundPage from './error/NotFoundPage';
import OrderManager from './components/OrderManager/OrderManager';
import OrderSuccess from './components/OrderManager/OrderSuccess';
import ProcessLoadingModal from './components/ProductManager/ProcessLoadingModal';
import ListOrderUser from './components/Profile/ListOrderUser';
import DetailOrder from './components/Profile/DetailOrder';
import Search from './components/Search/Search';
import TypeProduct from './components/categories/TypeProduct';
import ListBrand from './components/ProductManager/ListBrand';
import ListType from './components/ProductManager/ListType';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Shop />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/detail-product/:name/:id' element={<DetailProduct />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/search/:name' element={<Search />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/create-product' element={<CreateProduct />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/list-order' element={<ListOrderUser />} />
      <Route path='/profile/detail-order/:order_id' element={<DetailOrder />} />
      <Route path='/product-manager' element={<ProductManager />} />
      <Route path='/product-manager/brand' element={<ListBrand />} />
      <Route path='/product-manager/type' element={<ListType />} />
      <Route path='/order-manager' element={<OrderManager />} />
      <Route path='/user-manager' element={<UserManager />} />
      <Route path='/order' element={<Order />} />
      <Route path='/order/success/:session/:cart/:user' element={<OrderSuccess />} />
      <Route path='*' element={<NotFoundPage />} />
      <Route path='/collection/:categories/:type' element={<TypeProduct />} />
      
    </Routes>
  );
}

export default App;
