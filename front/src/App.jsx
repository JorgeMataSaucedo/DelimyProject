import { useState } from 'react'
import reactLogo from './assets/react.svg'
//import './Auth.css'

import React from "react";
import {BrowserRouter} from "react-router-dom";
import {WebRouter, AdminRouter} from "./router/index.js";

function App() {
//Delimy
    return (
        <BrowserRouter>
            <WebRouter/>
            <AdminRouter/>
        </BrowserRouter>
    )
}

export default App
