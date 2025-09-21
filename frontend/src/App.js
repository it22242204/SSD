import React from "react";
import { Route, Routes } from "react-router";
//Dilivery Management ----------------------->
//ADMIN
import DliveryData from "./Components/Admin/DiliveryManagement/Dlivery/DliveryData/DliveryData";
//--Driver
import DriverLogin from "./Components/Driver/DriverLogin/DriverLogin";
import AddDriver from "./Components/Admin/DiliveryManagement/Driver/AddDriver/AddDriver";
import DriverDetails from "./Components/Admin/DiliveryManagement/Driver/DriverDetails/DriverDetails";
import UpdateDriver from "./Components/Admin/DiliveryManagement/Driver/UpdateDriver/UpdateDriver";
//--Vehical
import AddVehical from "./Components/Admin/DiliveryManagement/Vehical/AddVehical/AddVehical";
import VehicalDetails from "./Components/Admin/DiliveryManagement/Vehical/VehicalDetails/VehicalDetails";
import UpdateVehical from "./Components/Admin/DiliveryManagement/Vehical/UpdateVehical/UpdateVehical";
//USER
import AddDilivery from "./Components/User/DeliveryManagement/AddDilivery/AddDilivery";
import MyOrder from "./Components/User/DeliveryManagement/MyOrder/MyOrder";

//Rating System ----------------------->
//USER
import AddRate from "./Components/User/RatingSystem/Add-Rates/AddRate";
import RateDetails from "./Components/User/RatingSystem/Rate/RateDetails";
import AdminRateDetails from "./Components/Admin/Rate/AdminRateDetails";
import MyRate from "./Components/User/RatingSystem/MyRate/MyRate";
import UpdateRate from "./Components/User/RatingSystem/UpdateRate/UpdateRate";


//Product Management ----------------------->
//ADMIN
import AddProduct from "./Components/Admin/ProductManagement/AddProduct/AddProduct";
import AllProducts from "./Components/Admin/ProductManagement/Product/Products";
import UpdateProducts from "./Components/Admin/ProductManagement/Product/UpdateProduct";
//USER
import ViewAllProducts from "./Components/User/ProductManagement/Products/Products";
import ViewOneProduct from "./Components/User/ProductManagement/Products/ProductDetails";

//User Management ----------------------->
//ADMIN
import UserDetails from "./Components/Admin/UserManagement/UserDetails";
//USER
import UserRegister from "./Components/User/UserManagement/UserRegister/Register";
import UserLogin from "./Components/User/UserManagement/UserLogin/Login";
import UserProfiel from "./Components/User/UserManagement/UserProfile/UserProfiel";
import UserUpdateAccount from "./Components/User/UserManagement/UpdateAccount/UpdateAccount";


//Shopping Cart ----------------------->
//USER
import AddToCart from "./Components/User/ShoppingCart/Cart/AddtoCart";
import ViewCart from "./Components/User/ShoppingCart/Cart/Carts";
import EditCart from "./Components/User/ShoppingCart/Cart/EditCartItem";
// import AddPayment from "./Components/User/ShoppingCart/Payment/AddPayment";

//Supplier Manegment ----------------------->
//ADMIN
import AddSupplier from "./Components/Admin/SupplierManegment/AddSupplier/AddSupplier";
import SupplierDetails from "./Components/Admin/SupplierManegment/SupplierDetails/SupplierDetails";
import UpdateSupplier from "./Components/Admin/SupplierManegment/UpdateSupplier/UpdateSupplier";
//Inventroy Manegment ----------------------->
//ADMIN
import AddInventory from "./Components/Admin/InventroyManegment/AddItem/AddItem";
import InventoryDetails from "./Components/Admin/InventroyManegment/ItemDetails/ItemDetails";
import UpdateInventory from "./Components/Admin/InventroyManegment/UpdateItem/UpdateItem";
import LowStockInventoryItem from "./Components/Admin/InventroyManegment/LowStockInventoryItem/LowStockInventoryItem";
//Employe Manegment ----------------------->
//ADMIN
import AddEmploye from "./Components/Admin/EmployeManegment/AddEmploye/AddEmploye";
import EmployeDetails from "./Components/Admin/EmployeManegment/EmployeDetails/EmployeDetails";
import UpdateEmploye from "./Components/Admin/EmployeManegment/UpdateEmploye/UpdateEmploye";
//Admin & User Functions ----------------------->
import AdminDash from "./Components/Admin/AdminDashBord/Dash/AdminDash";
import Home from "./Components/User/Home/Home";
import BeforHome from "./Components/User/Home/BeforHome";
import Accept from "./Components/Admin/DiliveryManagement/Dlivery/Accept/Accept";
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin";
import InformSupply from "./Components/Admin/InventroyManegment/InformSupply/InformSupply";
import RegularCollection from "./Components/User/RegularCollectionManagement/RegularCollection";
import AddRegisterUserPayment from "./Components/User/RegularCollectionManagement/AddRegisterUserPayment";



import RegisterUserPaymentDetails from "./Components/Admin/RegisterUserPaymentDetails/RegisterUserPaymentDetails";
import SpecialCollectionPayment from "./Components/User/SpecialCollection/SpecialCollectionPayment";
import PaymentsList from "./Components/Admin/PaymentList/PaymentsList";
import Eticket from "./Pages/Eticket";
import Eticketadmin from "./Pages/Admin"
import Error from "./Pages/404"
import AboutUs from "./Components/User/Home/AboutUs";


import DriverDliveryData from "./Components/Driver/DiliveryManagement/Dlivery/DliveryData/DliveryData";
import DriverAccept from "./Components/Driver/DiliveryManagement/Dlivery/Accept/Accept";
import DriversDetails from "./Components/Driver/DiliveryManagement/Driver/DriverDetails/DriverDetails";
import DriverDash from "./Components/Driver/DriverDashBord/Dash/DriverDash";
import Notifications from "./Components/Driver/DiliveryManagement/Notifications/Notifications";
import RequestHandling from "./Components/Admin/RequestHandling/RequestHandling";
import AssignDriver from "./Components/Admin/RequestHandling/AssignDriver";

//special collection requests User
import Addorder from './Components/User/Specialorder/Addorder/Addorder';
import Orderdetails from './Components/User/Specialorder/Orderdetails/Orders';
import Updateorder from './Components/User/Specialorder/Updateorder/Updateorder';
import AddPayment from './Components/User/Specialorder/PaymentProcess/AddPayment';
import PaymentSuccess from './Components/User/Specialorder/PaymentProcess/Paymentsuccessful';
// special collection request admin
import SpecialOrderDis from './Components/Admin/Specialorder/Orderdetail/SpecialOrderdis';
import DriverNot from './Components/Driver/Notifications/Notifications';

import SpecialCollectionPaymentDetails from "./Components/Admin/Specialorder/Orderdetail/SpecialCollectionPaymentDetails";

//Recycle Service - User
import Wasteform from './Components/User/RecycleService/Wasteform';
import Summarypage from './Components/User/RecycleService/Summarypage';
import BillPage from './Components/User/RecycleService/BillPage';

//Recycle service - admin
import Adminpanel from './Components/Admin/RecycleService/Adminpanel';

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/* --------------- USER Side ---------------*/}
          <Route path="/afetrhome" element={<Home />} />
          <Route path="/" element={<BeforHome />} />
          <Route path="/eticket" element={<Eticket />} />
          <Route path="/aboutus"element={<AboutUs/>}/>

          {/*Dilivery Management*/}
          <Route path="/adddelivery" element={<AddDilivery />} />
          <Route path="/myorder" element={<MyOrder />} />
          {/*Rating System*/}
          <Route path="/addrate" element={<AddRate />} />
          <Route path="/ratedetails" element={<RateDetails />} />
          <Route path="/AdminRateDetails" element={<AdminRateDetails />} />
          <Route path="/myrate" element={<MyRate />} />
          <Route path="/updaterate/:id" element={<UpdateRate />} />
          {/*Product Management*/}
          {/*User Management*/}
          <Route path="/userregister" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/userprofile" element={<UserProfiel />} />
          <Route path="/updateaccount/:id" element={<UserUpdateAccount />} />
          {/* Regular Collection  */}
          <Route path="/request" element={<RegularCollection/>}/>
          {/*Regular Collection Payment */}
          <Route path="/addregisteruserpayment" element={<AddRegisterUserPayment/>}/>

          {/* --------------- ADMIN Side ---------------*/}
          {/*Admin Home*/}
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          {/*Admin Home*/}
          <Route exact path="/admin" element={<AdminDash />} />
          <Route exact path="/eticketadmin" element={<Eticketadmin/>} />
          <Route exact path="/404" element={<Error/>}/>
          {/*Dilivery Management*/}
          {/*Dlivery */}
          <Route path="/delivrydata" element={<DliveryData />} />
          <Route path="/driveraccept/:id" element={<Accept />} />
          {/*Driver*/}
          <Route path="/DriverDash" element={<DriverDash />} />
          <Route path="/driverdelivrydata" element={<DriverDliveryData />} />
          <Route path="/driveraccept" element={<DriverAccept />} />
          <Route path="/DriverProfile" element={<DriversDetails />} />
          <Route path="/notifications" elements={<DriverNotification />}/>
          {/* <Route path="/Notifications" element={<Notifications />} /> */}
          <Route path="/adddriver" element={<AddDriver />} />
          <Route path="/driverdetails" element={<DriverDetails />} />
          <Route path="/updateedriver/:id" element={<UpdateDriver />} />
          <Route path="/assigndriver" element={<AssignDriver/>}/>
          {/*Vehical*/}
          <Route path="/addvehical" element={<AddVehical />} />
          <Route path="/vehicaldetails" element={<VehicalDetails />} />
          <Route path="/updateevehical/:id" element={<UpdateVehical />} />
          {/*Product Management*/}
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/admin-allproducts" element={<AllProducts />} />
          <Route exact path="/update/:id" element={<UpdateProducts />} />
          <Route exact path="/viewall" element={<ViewAllProducts />} />
          <Route exact path="/viewoneproduct/:id" element={<ViewOneProduct />}
          />
          {/*User Management*/}
          <Route path="/userdetails" element={<UserDetails />} />
          {/*Supplier Manegment*/}
          <Route path="/addsupplier" element={<AddSupplier />} />
          <Route path="/supplierdetails" element={<SupplierDetails />} />
          <Route path="/updatesupplier/:id" element={<UpdateSupplier />} />
          {/*Inventroy Manegment*/}
          <Route path="/addinventoryitem" element={<AddInventory />} />
          <Route path="/inventoryitemdetails" element={<InventoryDetails />} />
          <Route path="/inventoryitelowstock" element={<LowStockInventoryItem />} />
          <Route path="/updateinventoryitem/:id" element={<UpdateInventory />} />
          <Route path="/infromsupply" element={<InformSupply />} />
          {/*Employe Manegment*/}
          <Route path="/addemployee" element={<AddEmploye />} />
          <Route path="/employeedetails" element={<EmployeDetails />} />
          <Route path="/updateemployee/:id" element={<UpdateEmploye />} />

          {/*Product Management*/}
          <Route exact path="/add-product" element={<AddProduct />} />
          <Route exact path="/admin-allproducts" element={<AllProducts />} />
          <Route exact path="/update/:id" element={<UpdateProducts />} />
          <Route exact path="/viewall" element={<ViewAllProducts />} />
          <Route exact path="/viewoneproduct/:id" element={<ViewOneProduct />} />
          {/*Shopping Cart*/}
          <Route path="/add-cart" element={<AddToCart />} />
          <Route path="/view-cart" element={<ViewCart />} />
          <Route path="/update-cart/:id" element={<EditCart />} />
          {/* <Route path="/add-payment" element={<AddPayment />} /> */}
          <Route path="/requesthandling" element={<RequestHandling/>}/>
          {/* Driver Panel */}
          <Route path="/driverlogin" element={<DriverLogin />} />

          <Route path="/registeruserpaymentdetails" element={<RegisterUserPaymentDetails />} />

          {/* special collection */}
          <Route path="/specialcollectionpayment" element={<SpecialCollectionPayment />} />

          <Route path="/paymentslist" element={<PaymentsList />} />
          {/* RecycleService - user */}
          <Route path="/waste" element={<Wasteform/>}/>
          <Route path="/summary" element={<Summarypage/>}/>
          <Route path="/bill" element={<BillPage/>}/>
          {/* RecycleService - admin */}
          <Route path="/adminr" element={<Adminpanel/>}/>
          
          {/* special collection request */}
          <Route path="/addspecialorder" element={<Addorder/>}/>
          <Route path="/specialorderdetails" element={<Orderdetails/>} />
          <Route path="/specialorderdetails/:id" element={<Updateorder/>}/>
          <Route path="/specialpayment" element={<AddPayment/>}/>
          <Route path="/specialpaymentsuc" element={<PaymentSuccess/>}/>
          <Route path="/specialorderdisadmin" element={<SpecialOrderDis/>}/>
          <Route path="/drivernot" element={<DriverNot/>}/>
          <Route path="/specialcollectionpaymentdetails" element={<SpecialCollectionPaymentDetails/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
