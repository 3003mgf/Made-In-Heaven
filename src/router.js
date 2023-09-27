import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import Checkout from './views/Checkout/Checkout';
import Layout from './components/Layout/Layout';
import Home from './views/Home/Home';
import LVCollection from './views/LVCollection/LVCollection';
import SignUp from './views/SignUp/SignUp';
import Account from './views/Account/Account';
import Profile from './views/Account/Profile/Profile';
import Wishlist from './views/Account/Wishlist/Wishlist';
import Orders from './views/Account/Orders/Orders';
import SeeAll from './views/SeeAll/SeeAll';
import OurStore from './views/Store/Store';
import Detail from './views/Detail/Detail';
import ForgotPassword from './views/ForgotPassword/ForgotPassword';
import ResetPassword from './views/ResetPassword/ResetPassword';
import PrivateRoute from './components/Utils/PrivateRoute';

const Router = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      {/* INSIDE LAYOUT */}
      <Route path="/" element={<Layout/>}>
        <Route exact path="home" element={<Home/>}/>
      </Route>

      {/* OUTSIDE LAYOUT */}
      <Route exact path="/collection/:collection" element={<LVCollection/>}/>
      <Route exact path="/account" element={<PrivateRoute><Account/></PrivateRoute>}/>
      <Route exact path="/account/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
      <Route exact path="/account/wishlist" element={<PrivateRoute><Wishlist/></PrivateRoute>}/>
      <Route exact path="/account/orders" element={<PrivateRoute><Orders/></PrivateRoute>}/>
      <Route exact path="/seeAll/:collection" element={<SeeAll/>}/>
      <Route exact path="/seeAll/:collection/:category" element={<SeeAll/>}/>
      <Route exact path="/ourStore" element={<OurStore/>}/>
      <Route exact path="/product/:id" element={<Detail/>}/>
      <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
      <Route exact path="/reset-password/:token" element={<ResetPassword/>}/>
      <Route index element={<Landing/>}/>
      <Route exact path="checkout" element={<PrivateRoute><Checkout/></PrivateRoute>}/>
      <Route exact path="signUp" element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
   );
}
 
export default Router;