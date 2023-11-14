import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import store from './store';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/homePage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route index={ true } path='/' element={ <HomePage /> } />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <React.StrictMode>
          <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>,
)
