import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<Home/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
