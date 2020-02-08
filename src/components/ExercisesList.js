import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        paddingTop:'2rem',
    },
    linkButton:{
        textDecoration:'none'
    },
    table:{
        minWidth: '60vw',
        border: '2.5px #FF8E53 solid'
    }
})

const StyledTableCellHead = withStyles({
    root:{
        backgroundColor: '#FF8E53',
        color: 'white',
        fontSize: '1.1rem'
    }
})(TableCell)
const ExercisesList = () => {
    const [exercises, setExercises] = useState([])
    const classes = useStyles()


    const Exercise = (props) => ( 
         <TableRow>
            <TableCell align="center">{props.exercise.username}</TableCell>
            <TableCell align="center">{props.exercise.description}</TableCell>
            <TableCell align="center">{props.exercise.duration}</TableCell>
            <TableCell align="center">{props.exercise.date.substring(0,10)}</TableCell>
            <TableCell align="center">
            <Link className={classes.linkButton} to={"/edit/"+props.exercise._id}><Button variant="outlined" color="secondary">Edit </Button> </Link> <Button variant="contained"
        color="secondary" startIcon={<DeleteIcon />} onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</Button>
            </TableCell>
           
         </TableRow>
            
        
)
    

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

    const exerciseList = () => {
        return exercises.map( currentexercise => {
            return <Exercise 
                        exercise={currentexercise}
                        deleteExercise={deleteExercise}
                        key={currentexercise._id}
                         />
        })
    }


    return(
        <Grid
          container
          spacing={0}
          justify="center"
          alignItems="center"
          direction="column"
          >

            <Typography gutterBottom variant="h2" className={classes.title}>Logged Exercises</Typography>  

            <Grid item>
            <TableContainer component={Paper} >
            <Table className={classes.table} aria-label="excercises-table">
                <TableHead>
                    <TableRow>
                        <StyledTableCellHead align="center">Username</StyledTableCellHead>
                        <StyledTableCellHead align="center">Description</StyledTableCellHead>
                        <StyledTableCellHead align="center">Duration</StyledTableCellHead>
                        <StyledTableCellHead align="center">Date</StyledTableCellHead>
                        <StyledTableCellHead align="center">Actions</StyledTableCellHead>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exerciseList()}
                </TableBody>
            </Table>
            </TableContainer>
            </Grid>
          
        </Grid>
    )
}

export default ExercisesList