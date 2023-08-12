import React from "react";
import { Root, Navbar, Contact } from "./constants/index";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navbar />}>
                    <Route index element={<Root />} />

                    <Route path='contact' element={<Contact />} />

                    <Route path='signin' element={<h1>Signin here</h1>} />

                    <Route path='*' element={<h1>Error!</h1>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
