import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ResultPublic from "./components/ResultPublic";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

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
