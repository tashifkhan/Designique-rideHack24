import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React from 'react';
import { ScreenMode } from './LoginSignup';
import { database } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { txtDB } from './FirebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const SignupForm = ({ onSwitchMode }) => {

  const history = useNavigate();

  const [data,setdata] = useState({
    name: '',
    email: '',
    password: '',
    pillar: ''
  })

  const handleInputs = (event) => {
    let inputs = {[event.target.name] : event.target.value}
    setdata({...data,...inputs});
  }

  const handleSubmit = async ()=>{
    if(data.pillar==="Des"){
      data.name = "Des_" + data.name;
    }
    else if(data.pillar==="Man"){
      data.name = "Man_" + data.name; 
    }
    else{
      data.name = "Con_" + data.name;
    }
    createUserWithEmailAndPassword(database,data.email,data.password)
    .then((response) => {
      history('/')
    })
    .catch((err) => {
      alert(err.message)
    })
    const valRef = collection(txtDB,'txtData')
    await addDoc(valRef,{txtVal:data.name})
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
            Create an account
          </Typography>
          <Typography color={colors.grey[600]}>
            Doloribus dolorem impedit aliquam sit veniam
          </Typography>
        </Stack>

        <Stack spacing={4}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Name</Typography>
              <input 
                placeholder='Name' 
                name='name' 
                type='text' 
                className='input-fields'
                onChange={event => handleInputs(event)}
              />
            </Stack>
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
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Choose What Defines You:</Typography>
              <select name="pillar" id="pillars" onChange={event => handleInputs(event)}>
                <option value="Des">Designer</option>
                <option value="Man">Manufacturer</option>
                <option value="Con">Consumer</option>
              </select>
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
              Sign Up
          </Button>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography>Already have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            Sign in
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignupForm;