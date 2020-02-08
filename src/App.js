import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Container from '@material-ui/core/Container';

import Navbar from './components/Navbar'
import ExercisesList from "./components/exercises-list.component";
import CreateExercise from './components/create-exercise.component'
import CreateUser from './components/create-user.component'
import EditExercise from './components/edit-exercise.component'


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
