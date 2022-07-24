import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './Components/Login/LoginForm';
import PasswordReset from './Components/PasswordReset/PasswordReset';
import SignUp from './Components/Signup/SignUp';
import VerifyEmail from './Components/VerifyEmail/VerifyEmail';
import Home from './Components/HomePage/Home';
import Redirect from './Components/Redirect/Redirect';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/password-reset/:uniqueURL" element={<PasswordReset />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:shortid" element={<Redirect />} />
      </Routes>

    </div>
  );
}

export default App;
