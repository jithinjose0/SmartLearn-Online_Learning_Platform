import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './pages/Auth/Auth';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />}>
            {/* <Route index element={<Home />} />
            <Route path="Contact" element={<Contact />} />
            <Route path="message_box" element={<MessageBox />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
