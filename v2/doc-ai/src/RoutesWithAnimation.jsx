import { Routes, Route, useLocation } from "react-router-dom";
import Home from './components/home/Home';
import Trial from './components/trial/Trial';

export default function RoutesWithAnimation() {
    const location = useLocation();

    return (
        <Routes location={location} key={location.key}>
            <Route index path="/" element={<Home />} />
            <Route index path="/trial" element={<Trial />} />
        </Routes>
    );
}