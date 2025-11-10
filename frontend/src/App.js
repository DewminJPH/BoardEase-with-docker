import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" exact element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element= {<Signup/>}/>
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
