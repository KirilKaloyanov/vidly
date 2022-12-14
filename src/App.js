import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProtectedRoute from './components/common/protectedRoute';
import MovieForm from "./components/movieForm"
import Movies from "./components/movies";
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/common/not-found';
import NavBar from './components/common/navBar';
import LoginForm from "./components/loginForm"; 
import Logout from "./components/logout"; 
import RegisterForm from './components/registerForm';
import auth from './services/authService';
import './App.css';

class App extends Component {
  state = {  };
  
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  
  render() { 
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user}/>
        <main className="container">
          <Switch>
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={RegisterForm} />
            <ProtectedRoute path='/movies/:id' component={MovieForm} />
            <Route path="/movies" render={props => <Movies {...props} user={user}/>}></Route>
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
}
 
export default App;

