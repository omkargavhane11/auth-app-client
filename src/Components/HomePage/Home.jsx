import "./home.css"
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate= useNavigate();
  const handleLogout=()=>{
    navigate("/")
  }

  return (
   
<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Navbar</a>
      <button onClick={handleLogout} size="sm" className="homeLogout btn btn-success">Logout</button>
    </nav>

    <h3 className="homeBody">Welcome to home Page 😎</h3>

</>
     
  )
}
