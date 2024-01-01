import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

function App() {







  return (
    <>

      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Home />} />

        </Routes>

      </BrowserRouter>

    </>
  );
}

export default App;