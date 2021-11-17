import React  from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch}  from 'react-router-dom';

// import MasterLayout from './layouts/admin/MasterLayout';
import PublicRoute from './PublicRoute';


import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import axios from 'axios';
import AdminPrivateRoute from './AdminPrivateRoute';



axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';


axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token =localStorage.getItem('auth_token');
  config.headers.Authorization = token? `Bearer ${token}` : '';
  return config;
})



function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            {/* <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} /> */}
             <AdminPrivateRoute path="/admin" name="Admin" />


            <PublicRoute path="/" name="Home"  />

            {/* <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} /> */}
            <Route path="/login">
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
            </Route>

            <Route path="/register">
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
            </Route>

           
          </Switch>
        </Router>
    </div>
  );
}

export default App;
