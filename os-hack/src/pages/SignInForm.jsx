import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React from 'react';
import { ScreenMode } from './LoginSignup';
import { database } from './FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SigninForm = ({ onSwitchMode }) => {

  const history = useNavigate();

  const [data,setdata] = useState({
    email: '',
    password: ''
  })

  const handleInputs = (event) => {
    let inputs = {[event.target.name] : event.target.value}
    setdata({...data,...inputs});
  }

  const handleSubmit =()=>{
    signInWithEmailAndPassword(database,data.email,data.password)
    .then(() => {
      history('/');
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        color: colors.grey[800]
      }}
    >
      <Stack spacing={5} sx={{
        width: "100%",
        maxWidth: "500px"
      }}>
        <Stack>
          <Typography variant='h4' fontWeight={600} color={colors.grey[800]}>
            Welcome back
          </Typography>
          <Typography color={colors.grey[600]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </Typography>
        </Stack>

        <Stack spacing={4}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Email</Typography>
              <input 
                placeholder='Email' 
                name='email' 
                type='email' 
                className='input-fields'
                onChange={event => handleInputs(event)}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Password</Typography>
              <input 
                placeholder='Password' 
                name='password' 
                type='password' 
                className='input-fields'
                onChange={event => handleInputs(event)}
              />  
            </Stack>
          </Stack>
          <Button
            variant='contained'
            size='large'
            sx={{
              bgcolor: colors.grey[800],
              "&:hover": {
                bgcolor: colors.grey[600]
              }
            }}
            onClick={handleSubmit} 
          >
              Sign In
          </Button>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography>Don't have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            Sign up now
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SigninForm;