import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./redux/store/configureStore";
import {Provider} from "react-redux";
import DashboardPage from "./components/DashboardPage";

const store = configureStore();

library.add(fas, faTwitter, faFontAwesome);

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <DashboardPage />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
