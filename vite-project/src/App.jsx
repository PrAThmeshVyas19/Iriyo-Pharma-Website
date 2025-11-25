import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import iriyoLogo from "./assets/logo/IriyoLogo.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center">
        <img src={iriyoLogo} alt="" />
      </div>
      <p className="text-4xl text-blue-100">Iriyo Pharma</p>
    </>
  );
}

export default App;
