import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

const ResultPublic = lazy(() => import("./components/ResultPublic"));
const Admin = lazy(() => import("./components/Admin"));

import "./App.css";

function App() {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<ResultPublic />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </HashRouter>
        </>
    );
}

export default App;
