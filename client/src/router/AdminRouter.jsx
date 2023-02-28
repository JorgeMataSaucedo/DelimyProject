import React from "react";
import { Route, Routes} from 'react-router-dom';
import {Login, Register} from "../pages/admin";


export function AdminRouter() {
    return (
        <Routes>
            <Route exact path="/admin/login" element={<Login/>} />
            <Route exact path="/admin/register" element={<Register/>} />
        </Routes>
    );
}