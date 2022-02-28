import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Form from './components/Form/Form';
import EditPost from './components/EditPost/EditPost';
import Posts from './components/Posts/Posts';



const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/editpost" element={<EditPost />} />
          <Route path="/details" element={<Posts />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;