import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "./routes/Messages"
import Home from "./routes/Home"
import Login from "./routes/Login"
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="home" element={<App />} />
            <Route path="messages" element={<Messages />} />
        </Routes>
    </BrowserRouter>
);

