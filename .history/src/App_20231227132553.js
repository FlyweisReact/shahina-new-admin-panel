/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./E-CommerceAdmin/forms/Login";
import Dashboard from "./E-CommerceAdmin/pages/Dashboard";
import ECategory from "./E-CommerceAdmin/pages/ECategory";
import Order from "./E-CommerceAdmin/pages/Orders/Order";
import SingleOrder from "./E-CommerceAdmin/pages/Orders/SingleOrder";
import Product from "./E-CommerceAdmin/pages/Product/Product";
import CreateProduct from "./E-CommerceAdmin/pages/Product/CreateProduct";
import SingleProduct from "./E-CommerceAdmin/pages/Product/SingleProduct";
import EditProduct from "./E-CommerceAdmin/pages/Product/EditProduct";
import AboutUs from "./E-CommerceAdmin/pages/AboutUs/AboutUs";
import CreateAboutUs from "./E-CommerceAdmin/pages/AboutUs/create-about-us";
import EditAboutUs from "./E-CommerceAdmin/pages/AboutUs/edit-about-us";
import Query from "./E-CommerceAdmin/pages/Query/Query";
import Contact from "./E-CommerceAdmin/pages/Contact/Contact";
import User from "./E-CommerceAdmin/pages/User/User";
import Blog from "./E-CommerceAdmin/pages/Blog/Blog";
import Banner from "./E-CommerceAdmin/pages/Banner/Banner";
import UserData from "./E-CommerceAdmin/pages/User/UserData";
import Ad from "./E-CommerceAdmin/pages/BannerAd/Ad";
import Privacy from "./E-CommerceAdmin/pages/PrivacyPolicy/Privacy";
import Terms from "./E-CommerceAdmin/pages/Terms/Terms";
import Brand from "./E-CommerceAdmin/pages/Brand";
import Nutrition from "./E-CommerceAdmin/pages/Nutrition";
import ProductType from "./E-CommerceAdmin/pages/ProductType";
import SkinCondition from "./E-CommerceAdmin/pages/SkinCondition";
import SkinType from "./E-CommerceAdmin/pages/SkinType";
import Service from "./E-CommerceAdmin/pages/Service/Service";
import SingleService from "./E-CommerceAdmin/pages/Service/SingleService";
import CreateService from "./E-CommerceAdmin/pages/Service/CreateService";
import Editservice from "./E-CommerceAdmin/pages/Service/Editservice";
import Subscription from "./E-CommerceAdmin/pages/Subscription/Subscription";
import CreateSubscription from "./E-CommerceAdmin/pages/Subscription/CreateSubscription";
import EditSubscription from "./E-CommerceAdmin/pages/Subscription/EditSubscription";
import Reviews from "./E-CommerceAdmin/pages/Reviews/Reviews";
import Faq from "./E-CommerceAdmin/pages/FAQ/Faq";
import Ingredeints from "./E-CommerceAdmin/pages/Ingredeints/Ingredeints";
import GiftCard from "./E-CommerceAdmin/pages/GiftCard/GiftCard";
import CreateGiftCard from "./E-CommerceAdmin/pages/GiftCard/CreateGiftCard";
import Acne from "./E-CommerceAdmin/pages/Acne/Acne";
import AcneSuggestion from "./E-CommerceAdmin/pages/AcneSuggestion/AcneSuggestion";
import AddOnService from "./E-CommerceAdmin/pages/AddOnService/AddOnService";
import Gallery from "./E-CommerceAdmin/pages/Gallery/Gallery";
import SingleBanner from "./E-CommerceAdmin/pages/Banner/SingleBanner";
import AddHomeBanner from "./E-CommerceAdmin/pages/Banner/AddHomeBanner";
import AddPartnerBanner from "./E-CommerceAdmin/pages/Banner/AddPartnerBanner";
import AddShopBanner from "./E-CommerceAdmin/pages/Banner/AddShopBanner";
import AddServiceBanner from "./E-CommerceAdmin/pages/Banner/AddServiceBanner";
import AddPromotionBanner from "./E-CommerceAdmin/pages/Banner/AddPromotionBanner";
import ServiceOrder from "./E-CommerceAdmin/pages/Orders/ServiceOrder";
import ServiceOrderId from "./E-CommerceAdmin/pages/Orders/ServiceOrderId";
import Cart from "./E-CommerceAdmin/pages/User/Cart";
import Frequently from "./E-CommerceAdmin/pages/Frequently/Frequently";
import Transaction from "./E-CommerceAdmin/pages/Transaction/Transaction";
import Rewards from "./E-CommerceAdmin/pages/Rewards/Rewards";
import ProductReviews from "./E-CommerceAdmin/pages/Product/ProductReviews";
import Scheduler from "./E-CommerceAdmin/pages/Scheduler/Scheduler";
import Shipping from "./E-CommerceAdmin/pages/Shipping/Shipping";
import Slot from "./E-CommerceAdmin/pages/Slot/Slot";
import ShippingPrivacy from "./E-CommerceAdmin/pages/PrivacyPolicy/ShippingPrivacy";
import ReturnPolicy from "./E-CommerceAdmin/pages/PrivacyPolicy/ReturnPolicy";
import Chat from "./E-CommerceAdmin/pages/Chat/Chat";
import NewCal from "./E-CommerceAdmin/pages/Scheduler/NewCal";
import Overview from "./E-CommerceAdmin/pages/Scheduler/NewCal2";
import MembershipTerms from "./E-CommerceAdmin/pages/Subscription/MembershipTerms";
import Calender from "./E-CommerceAdmin/pages/Scheduler/Calender";
import Another from "./E-CommerceAdmin/pages/Scheduler/Another";
import CalenderNotification from "./E-CommerceAdmin/pages/Scheduler/Notification/CalenderNotification";
import { ReactNotifications } from "react-notifications-component";


function App() {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ReactNotifications />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/getblog" element={<Blog />} />
        <Route path="/ad" element={<Ad />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/banner/:id" element={<SingleBanner />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/Product-type" element={<ProductType />} />
        <Route path="/skin-condition" element={<SkinCondition />} />
        <Route path="/skinType" element={<SkinType />} />
        <Route path="/Category" element={<ECategory />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:product" element={<EditProduct />} />
        <Route path="/service" element={<Service />} />
        <Route path="/service/:id" element={<SingleService />} />
        <Route path="/create-service" element={<CreateService />} />
        <Route path="/edit-service/:id" element={<Editservice />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/create-subscription" element={<CreateSubscription />} />
        <Route path="/edit-subscription/:id" element={<EditSubscription />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/create-about-us" element={<CreateAboutUs />} />
        <Route path="/edit-about-us/:id" element={<EditAboutUs />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/query" element={<Query />} />
        <Route path="/ingredients" element={<Ingredeints />} />
        <Route path="/giftCard" element={<GiftCard />} />
        <Route path="/creatGift" element={<CreateGiftCard />} />
        <Route path="/acne" element={<Acne />} />
        <Route path="/acne-suggestion" element={<AcneSuggestion />} />
        <Route path="/add-on-service" element={<AddOnService />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/create-home-banner" element={<AddHomeBanner />} />
        <Route path="/create-partner-banner" element={<AddPartnerBanner />} />
        <Route path="/create-shop-banner" element={<AddShopBanner />} />
        <Route path="/create-service-banner" element={<AddServiceBanner />} />
        <Route
          path="/create-promotion-banner"
          element={<AddPromotionBanner />}
        />
        <Route path="/user" element={<User />} />
        <Route path="/user-data/:id" element={<UserData />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/order/:id" element={<SingleOrder />} />
        <Route path="/service-order" element={<ServiceOrder />} />
        <Route path="/service-order/:id" element={<ServiceOrderId />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/frequently" element={<Frequently />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/product-review/:id" element={<ProductReviews />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/slot" element={<Slot />} />
        <Route path="/shipping-privacy" element={<ShippingPrivacy />} />
        <Route path="/return-privacy" element={<ReturnPolicy />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/newCal" element={<NewCal />} />
        <Route path="/newCal2" element={<Overview />} />
        <Route path="/member_terms" element={<MembershipTerms />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/another" element={<Another />} />
        <Route path="/notification" element={<CalenderNotification />} />
      </Routes>
    </>
  );
}

export default App;
