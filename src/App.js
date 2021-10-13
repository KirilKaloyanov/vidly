import React from 'react';
import MovieForm from "./components/movieForm"
import Movies from "./components/movies";
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/common/not-found';
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/common/navBar';
import LoginForm from "./components/loginForm"; 
import './App.css';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path='/login' component={LoginForm} />
          <Route path='/movies/:id' component={MovieForm} />
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from='/' exact to='/movies' />
          <Redirect to='not-found' />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
