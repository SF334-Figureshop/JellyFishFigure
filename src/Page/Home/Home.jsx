import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import New from '../New/New';
import './Home.css';
import Trending from './Trending/Trending';

export default function Home() {
  return (
    <>
      <Container maxWidth="xl" className='home-container'>
        <Typography variant="h1" align="center" gutterBottom>
          Welcome to JellyFish
          <img src="https://blog.fromjapan.co.jp/en/wp-content/uploads/2019/07/SwimsuitFigures_banner-1.png" alt="JellyFish" className="home-image" />
        </Typography>
       
      </Container>
      <Container maxWidth="lg">
        <Trending />
      </Container>
      <Box className="home-spacer" />
    </>
  );
}