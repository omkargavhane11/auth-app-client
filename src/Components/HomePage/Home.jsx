import "./home.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const navigate= useNavigate();
  const handleLogout=()=>{
    navigate("/")
  }

  const [fullUrl,setFullUrl]= useState();
  const [urlData,setUrlData]= useState([]);

  async function getAllData(){
    const data = await axios.get("https://auth-app-37.herokuapp.com/shortUrl");
    setUrlData(data.data);
  }

  useEffect(() => {
    getAllData()
  }, []);

  const generateShortUrl=async ()=>{
    const genShortUrl = await axios.post("https://auth-app-37.herokuapp.com/shortUrl",{
      fullUrl:fullUrl
    })
    getAllData();
    setFullUrl("");
  }

  const TableRow=({url})=>{
    return(
          <tr>
          <td><a href={url.fullUrl} className="link">{url.fullUrl}</a></td>
          <td><a href={`/${url.shortUrl}`} className="link">{url.shortUrl}</a></td>
          <td>{url.clicks}</td>
          </tr>
          
    )
  }

  return (
<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Navbar</a>
      <button onClick={handleLogout} size="sm" className="homeLogout btn btn-success">Logout</button>
    </nav>

    <div className="homeBody">
    <h3 >URL Shortner</h3>
    <div className="inputWithButton">
    <input value={fullUrl} onChange={(e)=> setFullUrl(e.target.value)} type="url" className="fullUrl my-2" placeholder="URL"/>
    <button onClick={generateShortUrl} className="shrink">Shrink</button>
    </div>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Full URL</th>
          <th>Short URL</th>
          <th>Clicks</th>
        </tr>
      </thead>
      <tbody>
        {urlData?.map(url=>{
          return <TableRow key={url._id} url={url}/>
        })}
      </tbody>
    </table>


    </div>

</>
     
  )
}
