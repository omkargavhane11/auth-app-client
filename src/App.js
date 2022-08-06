import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LoginForm from './Components/Login/LoginForm';
import PasswordReset from './Components/PasswordReset/PasswordReset';
import SignUp from './Components/Signup/SignUp';
import VerifyEmail from './Components/VerifyEmail/VerifyEmail';
import Home from './Components/HomePage/Home';
import Redirect from './Components/Redirect/Redirect';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/")
  }

  return (
    <div className="App">
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/home">Navbar</a>
        <NavLink to="/dashboard" className="dashboard">Dashboard</NavLink>
        <button onClick={handleLogout} size="sm" className="homeLogout btn btn-success">Logout</button>
      </nav> */}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/password-reset/:uniqueURL" element={<PasswordReset />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:shortid" element={<Redirect />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </div>
  );
}

export default App;
