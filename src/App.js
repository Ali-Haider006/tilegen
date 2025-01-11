import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import ScrollToTop from "react-scroll-to-top";
import { useContext, useEffect } from "react";
import { ShopContext } from "./Context/ShopContext";
import Collections from "./Pages/Collections";
import Offers from "./Pages/Offers";
import AddProduct from "./Pages/AddProduct.jsx"
import ProductList from "./Pages/ProductList.jsx"
import PaymentForm from "./Pages/PaymentForm.jsx"
import CeramicTileProduct from "./Pages/3D/CeramicTileProduct.jsx"
import OctopusTileProduct from "./Pages/3D/OctopusTileProduct.jsx"
import FloralTileProduct from "./Pages/3D/FloralTileProduct.jsx"
import TileCalculator from './Pages/TileCalculator.jsx'
import ContractManagementForm from "./Pages/ContractManagementForm.jsx";
import ThreeDTiles from "./Pages/ThreeDTiles.jsx"
import VendorRegistration from "./Pages/VendorRegistration.jsx"
import ImageGeneration from "./Pages/ImageGeneration.jsx"
import TrackingDashboard from "./Pages/TrackingDashboard.jsx"
import SampleInspectionBar from "./Pages/SampleInspectionBar.jsx"
import AssociateOfficePage from "./Pages/AssociateOfficePage.jsx"
import AppealAndDocsPage from "./Pages/AppealAndDocsPage.jsx"
// import ContractManagement from "./Pages/ContractManagement.jsx"
import ContractList from "./Pages/ContractList.jsx"
// import DisputeDashboard from "./Pages/DisputeDashboard.jsx"
import DisputeResolutionPage from "./Pages/DisputeResolutionPage.jsx"
import InPersonMeeting from "./Pages/InPersonMeeting.jsx"
import VideoConferenceMeeting from "./Pages/VideoConferenceMeeting.jsx"
function App() {
  const { theme } = useContext(ShopContext);
  return (
    <div className={`${theme}_app`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/men"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/3DTiles" element={<ThreeDTiles/>}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kids_banner} category="kids" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/3D2" element={<CeramicTileProduct/>} />
          <Route path="/3D3" element={<OctopusTileProduct/>} />
          <Route path="/3D4" element={<FloralTileProduct/>} />
          <Route path="/Add" element={<AddProduct/>} />
          <Route path="/productList" element={<ProductList/>} />
          <Route path="/paymentForm" element={<PaymentForm/>} />
          <Route path="/TileCalculator" element={<TileCalculator/>} />
          <Route path="/ContractManagementForm" element={<ContractManagementForm/>} />
          <Route path="/VendorRegistration" element={<VendorRegistration/>} />
          <Route path="/ImageGeneration" element={<ImageGeneration/>} />
          <Route path="/TrackingDashboard" element={<TrackingDashboard/>} />
          <Route path="/SampleInspectionBar" element={<SampleInspectionBar/>} />
          <Route path="/AssociateOfficePage" element={<AssociateOfficePage/>} />
          {/* <Route path="/ContractManagement" element={<ContractManagement/>} /> */}
          <Route path="/ContractList" element={<ContractList/>} />
          <Route path="/AppealAndDocsPage" element={<AppealAndDocsPage/>} />
          {/* <Route path="DisputeDashboard" element={<DisputeDashboard/>} /> */}
          <Route path="DisputeResolutionPage" element={<DisputeResolutionPage/>} />
          <Route path="InPersonMeeting" element={<InPersonMeeting/>} />
          <Route path="VideoConferenceMeeting" element={<VideoConferenceMeeting/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ScrollToTop smooth component={<p style={{ color: "blue" }}>↑</p>} />
    </div>
  );
}

export default App;
