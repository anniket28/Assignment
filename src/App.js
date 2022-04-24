import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  const [progress, setprogress] = useState(0)
  const finished=()=>{
    setprogress(0)
  }
  return (
    <div className="App">
      <LoadingBar
      height={4}
        color='blue'
        progress={progress}
        onLoaderFinished={finished}
      />
      <Router>
        <Switch>
          {/* Login Component */}
          <Route exact path={'/'}><Login setprogress={setprogress}/></Route>
          {/* Signup Component */}
          <Route exact path={'/signup'}><Signup setprogress={setprogress}/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
