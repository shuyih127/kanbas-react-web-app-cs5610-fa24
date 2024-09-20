import React from 'react';
import './App.css';
import Labs from "./Labs";
import Kanbas from './Kanbas';
import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Links from './Links';

function App() {
  return (
    <div>
        <HashRouter>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="Labs" />} />
              <Route path="/Labs/*" element={<Labs />} />
              <Route path="/Kanbas/*" element={<Kanbas />} />
              <Route path="/Links" element={<Links />} />
            </Routes>
          </div>
        </HashRouter>  
    </div>
  );
}

export default App;
