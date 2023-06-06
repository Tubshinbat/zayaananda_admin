import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./Pages/App/";
import reportWebVitals from "./reportWebVitals";

// Reducers
import tokenReducer from "./redux/reducer/tokenReducer";
import loginReducer from "./redux/reducer/loginReducer";
import userReducer from "./redux/reducer/userReducer";
import menuReducer from "./redux/reducer/menuReducer";
import newsReducer from "./redux/reducer/newsReducer";
import newsCategoryReducer from "./redux/reducer/newsCategoryReducer";
import initCourseReducer from "./redux/reducer/initCourseReducer";
import lessonReducer from "./redux/reducer/lessonReducer";
import serviceReducer from "./redux/reducer/serviceReducer";
import costTypeReducer from "./redux/reducer/costTypeReducer";
import costReducer from "./redux/reducer/costReducer";
import adsReducer from "./redux/reducer/adsReducer";
import partnerReducer from "./redux/reducer/partnerReducer";
import faqReducer from "./redux/reducer/faqReducer";
import galleryReducer from "./redux/reducer/galleryReducer";
import webInfoReducer from "./redux/reducer/webinfoReducer";
import socialLinkReducer from "./redux/reducer/socialLinkReducer";
import bannerReducer from "./redux/reducer/bannerReducer";
import adsBannerReducer from "./redux/reducer/adsBannerReducer";
import footerMenuReducer from "./redux/reducer/footerMenuReducer";
import pageReducer from "./redux/reducer/pageReducer";
import bookingReducer from "./redux/reducer/bookingReducer";
import productReducer from "./redux/reducer/productReducer";
import employeeReducer from "./redux/reducer/employeeReducer"
// styles
import "./index.css";

const loggerMiddlaware = (store) => {
  return (next) => {
    return (action) => {
      // console.log("MyLoggerMiddleware: Dispatching ==> ", action);
      // console.log("MyLoggerMiddleware: State BEFORE : ", store.getState());
      const result = next(action);
      // console.log("MyLoggerMiddleware: State AFTER : ", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  tokenReducer,
  loginReducer,
  userReducer,
  menuReducer,
  newsReducer,
  serviceReducer,
  faqReducer,
  newsCategoryReducer,
  costReducer,
  costTypeReducer,
  galleryReducer,
  partnerReducer,
  adsReducer,
  webInfoReducer,
  socialLinkReducer,
  bannerReducer,
  adsBannerReducer,
  footerMenuReducer,
  lessonReducer,
  pageReducer,
  bookingReducer,
  productReducer,
  employeeReducer,
  initCourseReducer,
});

const middlewares = [loggerMiddlaware, thunk];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
