import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './pages/Auth/Auth';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<Home />} /> */}
            <Route path="home" element={<Home />} />
            <Route path="Signin" element={<Auth />} />
            {/* <Route path="message_box" element={<MessageBox />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
