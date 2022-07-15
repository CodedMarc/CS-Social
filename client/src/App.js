import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Messages from "./routes/Messages"
import Home from "./routes/Home"
import Login from "./routes/Login"
import Profile from './routes/Profile';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
