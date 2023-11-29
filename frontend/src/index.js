import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,
createRoutesFromElements,
Route,
RouterProvider} from 'react-router-dom'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
// import 'bootstrap/dist/css/bootstrap.min.css' 
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css'
import App from './App';
import { Provider } from 'react-redux';
import store from './store.js';
import reportWebVitals from './reportWebVitals';
import HomeSceens from './screens/HomeSceens';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import OrderListScreen from './screens/Admin/OrderListScreen.jsx';
import ProductListScreen from './screens/Admin/ProductListScreen.jsx';
import ProductEditScree from './screens/Admin/ProductEditScree.jsx';
import UserListScreen from './screens/Admin/UserListScreen.jsx';
import UserEditScreen from './screens/Admin/UserEditScreen.jsx';
import {HelmetProvider} from 'react-helmet-async'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeSceens />} />
      <Route path='/search/:keyword' element={<HomeSceens />} />
      <Route path='/page/:pageNumber' element={<HomeSceens />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeSceens />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/shipping' element={<ShippingScreen />} />

<Route path='' element={<PrivateRoute />}>
  <Route path='/shipping' element={<ShippingScreen />} />
  <Route path='/payment' element={<PaymentScreen />} />
  <Route path='/placeorder' element={<PlaceOrderScreen />} />
  <Route path='/order/:id' element={<OrderScreen />} />
  <Route path='/profile' element={<ProfileScreen />} />
</Route>
<Route path='' element={<AdminRoute />}>
  <Route path='/admin/orderlist' element={<OrderListScreen />} />
  <Route path='/admin/productlist' element={<ProductListScreen />} />
  <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
  <Route path='/admin/product/:id/edit' element={<ProductEditScree />} />
  <Route path='/admin/userlist' element={<UserListScreen />} />
  <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
</Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>

    <Provider store={store}>
<PayPalScriptProvider deferLoading={true}>

   <RouterProvider router={router} />
</PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
