import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Container from '@material-ui/core/Container';

import Navbar from './components/Navbar'
import ExercisesList from "./components/ExercisesList";
import CreateExercise from './components/CreateExercise'
import CreateUser from './components/CreateUser'
import EditExercise from './components/EditExercise'


function App() {
  return (

      <Router>
        <Navbar />
        {/* <br /> */}
        <Route path="/" component={ExercisesList} exact />
          <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} /> 
      </Router>

    
  );
}

export default App;
