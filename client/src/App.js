import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Auth from './components/Auth/Auth';
import EditPost from './components/EditPost/EditPost';
import Posts from './components/Posts/Posts';
import PostDetails from './components/PostDetails/PostDetails';
import UserPage from './components/UserPage/UserPage';
import Reservation from './components/Reservation/Reservation';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Home />}></Route>
          <Route path="/posts/search" element={<Search />} ></Route>
          <Route path="/auth" element={<Auth />} />
          <Route path="/editpost" element={<EditPost />} />
          <Route path="/editpost/:id" element={<EditPost />} />
          <Route path="/details" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/user/:id/reservation" element={<Reservation />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/user/:id" element={<UserPage />} />
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