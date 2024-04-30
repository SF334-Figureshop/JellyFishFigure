import React, { useState } from 'react';
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
} from '@mui/material';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        Swal.fire('Success', 'User created successfully', 'success');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        console.log(error);
        Swal.fire('Error', errorMessage, 'error');
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Paper elevation={3}>
          <Box p={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={signUp}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                <Button  variant="contained" color="secondary" fullWidth onClick={()=>navigate('/login')}>
                  Sign In
                </Button>
              </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}