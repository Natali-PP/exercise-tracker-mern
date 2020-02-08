import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Button from '@material-ui/core/Button';
import pink from '@material-ui/core/colors/pink';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {DatePicker} from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import axios from 'axios';


const useStyles = makeStyles({
    title:{
      paddingTop:'2rem',
    },
    root:{
      flexGrow: 1,
      width: '75vw',
      margin: '1rem'
    },
    input:{
      padding: '1rem'
    },
    sendButton:{
      alignItems:'center',
      marginTop: '2rem',
    }
  })
  
  const muiTheme = createMuiTheme({
    palette: {
      primary: pink,
    },
  });
  
  const EditExercise = (props) => {
    const classes = useStyles()
  
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([''])
  
    //submiting the form
  
    const handleSubmit = (e) => {
      e.preventDefault()
      
      let exercise = {
        'username': username,
        'description': description,
        'duration': duration,
        'date': date
      }
      console.log(exercise)
      axios.post('http://localhost:3000/exercises/update/'+props.match.params.id, exercise)
            .then(res => console.log(res.data))
      
  
      window.location ='/'
    }
  
    
     useEffect(() => {
      axios.get('http://localhost:3000/exercises/'+props.match.params.id)
            .then( response => {
              setUsername(response.data.username)
              setDescription(response.data.description)
              setDuration(response.data.duration)
              setDate(new Date(response.data.date))
            })
            .catch( err => console.log(err))
            

        axios.get('http://localhost:3000/users/')
                .then(res => {
                    setUsers(res.data.map( user => user.username))
                })
                .catch( err => console.log(err))
    }, [])  
  


    return(
        <Grid
          container
          spacing={10}
          justify="center"
          alignItems="center"
          direction="column"
          >

          <Grid item>
          <Typography className={classes.title} gutterBottom variant="h2">Create New Exercise Log</Typography>
          </Grid>
          
          <form className={classes.root} onSubmit={handleSubmit}>

          <Grid item className={classes.input} >
            <FormControl fullWidth>
            <InputLabel id="username">Username</InputLabel>
            <Select  
            labelId="username"
             value={username}
             onChange={ e => setUsername(e.target.value)}
             >

             {users.map( (user) =>  <option key={user} value={user}>{user}</option>)}
             </Select>
            </FormControl>
          </Grid>

          
          <Grid item className={classes.input} >
          <FormControl fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input  
            id="description" 
            value={description} 
            required
            onChange={e => setDescription(e.target.value)}
            ></Input>
            </FormControl>
          </Grid>

          <Grid item className={classes.input}>
            <FormControl fullWidth>
              <InputLabel htmlFor="duration">Duration - in minutes</InputLabel>
              <Input 
              id="duration" 
              value={duration}
              onChange={e => setDuration(e.target.value)}
              ></Input>
            </FormControl>
          </Grid>

          <Grid item className={classes.input}>
            <FormControl fullWidth>

              <>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={muiTheme}>
                <DatePicker
                variant="inline" 
                label="Date"
                value={date}
                onChange={ date => setDate(date)}
                />
                </ThemeProvider>
                
              </MuiPickersUtilsProvider>
              
              </>
            </FormControl>
          </Grid>
          
           <Button 
          variant="contained"
          color="secondary"
          size="large"
          className={classes.sendButton}
          type="submit"
          id="create-exercise-log"
          > 
          <AddRoundedIcon />
          Create Exercise Log </Button>
          </form>
        </Grid>
    )
}

export default EditExercise