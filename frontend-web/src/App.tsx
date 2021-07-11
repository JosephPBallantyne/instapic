import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Nav } from './components';
import { SignUp, LogIn, Home } from './pages';

function App() {
  return (
    <Router>
      <Nav />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={LogIn} />
      <Route path="/signup" exact component={SignUp} />
    </Router>
  );
}

export default App;
