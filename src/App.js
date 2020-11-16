import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Inventory from './components/Inventory';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <div style={{ display: "flex" }}>
          <Route exact path="/" component={Login} />
          <Route path="/inventory" component={Inventory} />
        </div>
      </Switch>
    </React.Fragment>
  );
}

export default App;
