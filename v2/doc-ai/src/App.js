import './App.css';
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import LocationProvider from './LocationProvider';
import RoutesWithAnimation from './RoutesWithAnimation';


function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <LocationProvider>
          <RoutesWithAnimation />
        </LocationProvider>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
