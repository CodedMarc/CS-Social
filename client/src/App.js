import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Messages from "./routes/Messages"
import Home from "./routes/Home"
import Login from "./routes/Login"
import Navbar from './components/Navbar';

function App() {
  // CSS GRID THIS SHIT BOIIIII
  return (
  <Router>
    <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/messages" exact element={<Messages />} />
    </Routes>
  </Router>
  );
}

export default App;
