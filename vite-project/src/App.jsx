import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import iriyoLogo from "./assets/logo/iriyologo.png"; // Adjust extension: 

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center">
        <img src={iriyoLogo} alt="" />
      </div>
      <p className="text-4xl text-blue-300">Iriyo Pharma</p>
    </>
  );
}

export default App;
