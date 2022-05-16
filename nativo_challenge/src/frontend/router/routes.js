import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react'
import App from "../App";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/:shortLink" element={<App />} />
            </Routes>
        </BrowserRouter>

    )
}
