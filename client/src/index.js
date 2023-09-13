import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//for routing functionality, install the package first and then import it here
import {BrowserRouter} from "react-router-dom";
//importing redux so it can be used across all the app
import { Provider } from 'react-redux';
import { store } from './redux/store';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }> 
  {/* passing the store redux as a prop  */}
    <BrowserRouter>
    {/* browser route enables the routing on the react app */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
