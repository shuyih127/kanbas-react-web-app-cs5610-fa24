import { Route, Routes, Navigate } from "react-router";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab1 from "./Lab1";
import TOC from "./TOC";

export default function Labs(){
    return (
        <div>
            <h1>Yihao Shu CS5610.20593.202510 Section: 01</h1>
            <h1>Labs</h1>
            <TOC />
            <Routes>
                <Route path="Lab1" element={<Lab1 />} />
                <Route path="Lab2" element={<Lab2 />} />
                <Route path="Lab3" element={<Lab3 />} />
            </Routes>
           
           
        </div>
    );
}