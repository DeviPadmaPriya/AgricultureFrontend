import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage/Home';
// import FarmerLogin from './components/Login/Farmer/FarmerLogin';
import DealerLogin from './components/Login/Dealer/DealerLogin';
import RegisterDealer from './components/Login/Dealer/RegisterDealer';
import AddCrop from './components/FarmerComponent/AddCrop';
import ViewAllCrops from './components/FarmerComponent/ViewAllCrops';
import UpdateCrop from './components/FarmerComponent/UpdateCrop';
import DeleteCrop from './components/FarmerComponent/DeleteCrop';
import RegisterFarmer from './components/Login/Farmer/RegisterFarmer';
import DealerCrops from './components/CartComponent/DealerCrops';
import FarmerLogin from './components/Login/Farmer/FarmerLogin';
import AddCart from './components/CartComponent/AddCart';
// import DealerProfile from './components/CartComponent/DealerProfile';
import DealerCartItems from './components/CartComponent/DealerCartItems';
// import DealerAndCart from './components/UserComponent/DealerProfile';
// import FarmerProfile from './components/FarmerComponent/FarmerProfile';
import Order from './components/CartComponent/Order';
import Payment from './components/CartComponent/Payment';
import AboutUs from './components/HomePage/AboutUs';
import DealerProfile from './components/UserComponent/DealerProfile';
import FarmerProfile from './components/UserComponent/FarmerProfile';
function App() {
  return (
   

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/aboutus" element={<AboutUs/>}> </Route>
      <Route path="/farmerRegister" element={<RegisterFarmer/>}></Route>
      <Route path="/farmlogin" element={<FarmerLogin/>}></Route>
      <Route path="/viewAllcrop" element={<ViewAllCrops/>}></Route>
      <Route path="/addcrop" element={<AddCrop/>}></Route>
      <Route path="/updatecrop" element={<UpdateCrop/>}></Route>
      <Route path="/deletecrop" element={<DeleteCrop/>}></Route>
      <Route  path="/farmerProfile" element={<FarmerProfile/>}></Route>

      
      <Route path="/dealerlogin" element={<DealerLogin/>}></Route>
      <Route path="/dealerRegister" element={<RegisterDealer/>}></Route>
      <Route path="/dealercrops" element={<DealerCrops/>}></Route>
      <Route path="/dealerProfile" element={<DealerProfile/>}></Route>
      <Route path="/dealercartitem" element={<DealerCartItems/>}></Route>
      <Route path="/dealerorder" element={<Order/>}></Route>
      <Route path="/dealerpayment" element={<Payment/>}></Route>
      <Route  path="/addcart" element={<AddCart/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
