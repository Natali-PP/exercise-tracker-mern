import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

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
    alignItems:'center',
    padding: '1rem'
  },
  sendButton:{
    alignItems:'center',
    marginTop: '2rem',
  }
})

 const CreateUser = () => {
  const [username, setUsername] = useState('')
  const [open, setOpen] = useState(false)
  const classes = useStyles()


  const onSubmit = (e) => {
    e.preventDefault()
    let newUser = {
      'username': username
    }

    console.log(newUser)

    
    axios.post('http://localhost:3000/users/add',newUser)
          .then( res => console.log(res.data))


    setUsername('')

  }
  
  return(
        <Grid
          container
          spacing={0}
          justify="center"
          alignItems="center"
          direction="column"
          >
        <Typography gutterBottom variant="h2" className={classes.title}>Create New User</Typography>  
        <form onSubmit={onSubmit} className={classes.root}>
          <Grid item className={classes.input}>
          <FormControl fullWidth>
          <InputLabel>Username</InputLabel>
            <Input
            type="text"
            required
            value={username}
            onChange={(e) =>setUsername(e.target.value) }
            ></Input>
          </FormControl>
            
          </Grid>
          <Grid item  >

            <Collapse in={open}>
            <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            User added!
          </Alert>
        </Collapse>
            <Button 
            disabled={open}
            variant="contained"
            color="secondary"
            size="large"
            type="submit"
            id="create-user"
            className={classes.sendButton}
            onClick={() => {
              setOpen(true);
              }}
            > 
            <AddRoundedIcon />
            Create User </Button>
          </Grid>



        
        </form>
          
        </Grid>
  )
}

export default CreateUser