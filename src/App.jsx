import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarGrid from "./components/CarGrid";
import CarDetails from "./components/CarDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarGrid />} />
        <Route path="/car/:id" element={<CarDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

//! from the render-model-project
// import ModelViewer from "./components/ModelViewer";

// function App() {
//   return (
//     <div className="App">
//       <ModelViewer />
//     </div>
//   );
// }

// export default App;
