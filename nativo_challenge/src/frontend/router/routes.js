import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react'
import App from "../App";
import { Redirect } from "../Redirect";
import Login from "../Login";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/a" element={<App/>} />
                <Route path="/redirectTo/:shortLink" element={<Redirect/>} />
            </Routes>
        </BrowserRouter>

    )
}
