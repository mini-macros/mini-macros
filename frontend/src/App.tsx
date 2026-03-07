import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-red-800">Mini Macros</h1>
      <div className="text-blue-800 border-black">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
