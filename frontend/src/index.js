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
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeSceens />} />
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
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
<PayPalScriptProvider deferLoading={true}>

   <RouterProvider router={router} />
</PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();