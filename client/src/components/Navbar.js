import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      padding: '0 30px',
    },
    title: {
        flexGrow: 1,
        color: '#fff8e1',
        textDecoration: 'none',
        fontSize: '1.25rem',
      },
      linkButton:{
        textDecoration:'none'
    }
  });

  const StyledNavButton = styled(Button)({
    padding: '0 2rem',
    color:'white'

  })


const Navbar = () => {

    const classes = useStyles();
    
    return(
        <AppBar position="static" className={classes.root}>
            <Toolbar>
            <Grid
                justify="space-between" 
                container 
                spacing={3}
                alignItems="center"
            >
            <Grid item >
            <Link to="/">
                <Button 
                    size="large" 
                    className={classes.title} 
                    edge="start">Excercise Tracker
                </Button> </Link>
            </Grid>
            <Grid 
                item
                >
                
                    <Link className={classes.linkButton} to="/" ><StyledNavButton >Exercises</StyledNavButton></Link>
                    <Link className={classes.linkButton} to="/create" ><StyledNavButton >Create Exercise Log</StyledNavButton></Link>
                    <Link className={classes.linkButton} to="/user" > <StyledNavButton >Create User</StyledNavButton> </Link>
               
            </Grid>
                
            </Grid>
            </Toolbar>
        </AppBar>
        
    )
}

export default Navbar;
