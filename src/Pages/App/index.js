import { useEffect } from "react";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useCookies, CookiesProvider } from "react-cookie";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";
import Cookies from "js-cookie";

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

// Import components
import Header from "../../Components/Header";
import Side from "../../Components/Side";

// Import page
import LoginPage from "../Login";
import Dashboard from "../Dashboard";
import News from "../News";
import NewsAdd from "../News/Add";
import NewsEdit from "../News/Edit";
import NewsCategories from "../News/News_categories";
// Course
import Course from "../Course";
import CourseAdd from "../Course/Add";
import CourseEdit from "../Course/Edit";
// Lessons
import Lesson from "../Lesson";
import LessonAdd from "../Lesson/Add";
import LessonEdit from "../Lesson/Edit";
//Services
import Service from "../Service";
import ServiceAdd from "../Service/Add";
import ServiceEdit from "../Service/Edit";
// paidtype
import Paytype from "../Paytype";
import PaytypeAdd from "../Paytype/Add";
import PaytypeEdit from "../Paytype/Edit";
// Ads
import Ads from "../Ads";
import AdsAdd from "../Ads/Add";
import AdsEdit from "../Ads/Edit";
//Partner
import Partner from "../Partner";
import PartnerAdd from "../Partner/Add";
import PartnerEdit from "../Partner/Edit";
//Faq
import Faq from "../Faq";
import FaqAdd from "../Faq/Add";
import FaqEdit from "../Faq/Edit";
//Gallery
import Gallery from "../Gallery";
import GalleryAdd from "../Gallery/Add";
import GalleryEdit from "../Gallery/Edit";
//Cart
import Cart from "../Cart";
import CartAdd from "../Cart/Add";
import CartEdit from "../Cart/Edit";
import CartView from "../Cart/Views";
// Invoice
import Invoice from "../Invoice";
import InvoiceView from "../Invoice/Views";
//User
import User from "../Users";
import UserAdd from "../Users/Add";
import UserEdit from "../Users/Edit";
//Booking
import Booking from "../Booking";
import BookingEdit from "../Booking/Edit";
import BookingAdd from "../Booking/Add";

// Product
import Product from "../Product";
import ProductAdd from "../Product/Add";
import ProductEdit from "../Product/Edit";
// Employee
import Employee from "../Employee";
import EmployeeAdd from "../Employee/Add";
import EmployeeEdit from "../Employee/Edit";

// Websettings
import WebSettings from "../WebSettings";
import Socials from "../WebSettings/socials";
import Banner from "../WebSettings/banner";
import BannerAdd from "../WebSettings/banner/Add";
import BannerEdit from "../WebSettings/banner/Edit";
import AdsBanner from "../WebSettings/ads";
import AdsBannerAdd from "../WebSettings/ads/Add";
import AdsBannerEdit from "../WebSettings/ads/Edit";
import Menus from "../Menus";
import FooterMenu from "../Menus/footer";
import Logout from "../Logout";
// Page
import PageAdd from "../Page/Add";
import PageEdit from "../Page/Edit";
import Page from "../Page";
// Actions
import { tokenCheck } from "../../redux/actions/tokenActions";

function App(props) {
  const validateMessages = {
    required: "Заавал бөглөнө үү!",
  };

  const [cookies] = useCookies(["zayatoken", "language"]);

  useEffect(() => {
    if (cookies.zayatoken) {
      const token = cookies.zayatoken;
      props.checkToken(token);
    }
  }, cookies);

  useEffect(() => {
    if (props.tokenError) {
      Cookies.remove("zayatoken");
      document.location.href = "/login";
    }
  }, props.tokenError);

  return (
    <>
      {cookies.zayatoken ? (
        <ConfigProvider form={{ validateMessages }}>
          <CookiesProvider>
            <Header />
            <Side />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path={"/news/edit/:id"} component={NewsEdit} />
              <Route path="/news/add" component={NewsAdd} />
              <Route path="/news" exact component={News} />
              // Services
              <Route path="/services/add" exact component={ServiceAdd} />
              <Route path="/services/edit/:id" exact component={ServiceEdit} />
              <Route path="/services" exact component={Service} />
              // Ads
              <Route path="/adsies/add" exact component={AdsAdd} />
              <Route path="/adsies/edit/:id" exact component={AdsEdit} />
              <Route path="/adsies" exact component={Ads} />
              // Partner
              <Route path="/partners/add" exact component={PartnerAdd} />
              <Route path="/partners/edit/:id" exact component={PartnerEdit} />
              <Route path="/partners" exact component={Partner} />
              // Faq
              <Route path="/faqs/add" exact component={FaqAdd} />
              <Route path="/faqs/edit/:id" exact component={FaqEdit} />
              <Route path="/faqs" exact component={Faq} />
              //Booking
              <Route path="/booking/add" exact component={BookingAdd} />
              <Route path="/booking/edit/:id" exact component={BookingEdit} />
              <Route path="/booking" exact component={Booking} />
              // Gallery
              <Route path="/gallery/add" exact component={GalleryAdd} />
              <Route path="/gallery/edit/:id" exact component={GalleryEdit} />
              <Route path="/gallery" exact component={Gallery} />
              // Course
              <Route path="/courses/add" exact component={CourseAdd} />
              <Route path="/courses/edit/:id" exact component={CourseEdit} />
              <Route path="/courses" exact component={Course} />
              // Lesson
              <Route path="/lesson/add" exact component={LessonAdd} />
              <Route path="/lesson/edit/:id" exact component={LessonEdit} />
              <Route path="/lesson" exact component={Lesson} />
              // Product
              <Route path="/product/add" exact component={ProductAdd} />
              <Route path="/product/edit/:id" exact component={ProductEdit} />
              <Route path="/product" exact component={Product} />
              // Cart
              <Route path="/carts/views/:id" exact component={CartView} />
              <Route path="/carts" exact component={Cart} />
              // Invoice
              <Route path="/invoice/views/:id" exact component={InvoiceView} />
              <Route path="/invoice" exact component={Invoice} />
              // Pages
              <Route path="/pages/add" exact component={PageAdd} />
              <Route path="/pages/edit/:id" exact component={PageEdit} />
              <Route path="/pages" exact component={Page} />
              // Employee
              <Route path="/employee/add" exact component={EmployeeAdd} />
              <Route path="/employee/edit/:id" exact component={EmployeeEdit} />
              <Route path="/employee" exact component={Employee} />
              // Employee
              <Route path="/paytype/add" exact component={PaytypeAdd} />
              <Route path="/paytype/edit/:id" exact component={PaytypeEdit} />
              <Route path="/paytype" exact component={Paytype} />
              //users
              <Route path="/users/add" exact component={UserAdd} />
              <Route path="/users/edit/:id" exact component={UserEdit} />
              <Route path="/users" exact component={User} />
              // Websettings
              <Route
                path="/web_settings/banners/add"
                exact
                component={BannerAdd}
              />
              <Route
                path="/web_settings/banners/edit/:id"
                exact
                component={BannerEdit}
              />
              <Route path="/web_settings/banners" exact component={Banner} />
              <Route path="/menus" exact component={Menus} />
              <Route path="/menus/footer" exact component={FooterMenu} />
              <Route
                path="/web_settings/adsbanners/add"
                exact
                component={AdsBannerAdd}
              />
              <Route
                path="/web_settings/adsbanners/edit/:id"
                exact
                component={AdsBannerEdit}
              />
              <Route
                path="/web_settings/adsbanners"
                exact
                component={AdsBanner}
              />
              <Route path="/web_settings/socials" exact component={Socials} />
              <Route path="/web_settings" exact component={WebSettings} />
              //
              <Route path="/news/categories" exact component={NewsCategories} />
              <Route path="/logout" component={Logout} />
              <Redirect to="/" />
            </Switch>
          </CookiesProvider>
        </ConfigProvider>
      ) : (
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tokenError: state.tokenReducer.error,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    checkToken: (token) => dispatch(tokenCheck(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
