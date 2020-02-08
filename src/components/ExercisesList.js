import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const ExercisesList = () => {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/exercises/')
            .then( res => {
                setExercises(res.data)
            })
            .catch((err) => {console.log('Error '+ err)})
    }, [])

    const deleteExercise = (id) => {
        axios.delete('http://localhost:3000/exercises/'+id)
            .then(res => console.log(res.data))

        setExercises(exercises.filter( elem => elem._id !== id))
    }
    return(
        <div>
            <p>You are on the Exercises List component!</p>
        </div>
    )
}

export default ExercisesList