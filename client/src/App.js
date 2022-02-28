import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Home />}></Route>
          <Route path="/posts/:id" element={<PostDetails />}></Route>
          <Route path="/posts/search" element={<Home />} ></Route>
          <Route path="/auth" element={<Auth />} ></Route>
          {/* {user ? (
            <Route path="/auth" element={<Navigate replace to="/posts" />} />
          ) : (
            <Route path="/auth" element={<Auth />}></Route>
          )
          } */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;