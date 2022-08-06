import "./home.css"
import { useNavigate } from "react-router-dom";
import { useEffect,  useState } from "react";
import axios from "axios";
// import dayjs from "dayjs";

export default function Home() {

  const navigate= useNavigate();

  // useStates
  const [fullUrl,setFullUrl]= useState();  
  const [urlData,setUrlData]= useState([]);
  const [dataMapped,setDataMapped]= useState(urlData);
  const [search,setSearch] = useState("");
  const [fromDate,setFromDate]= useState(null);
  const [toDate,setToDate]= useState(null);


  // getting all data of URL's created
  async function getAllData(){
    const data = await axios.get("https://auth-app-37.herokuapp.com/shortUrl");
    setUrlData(data.data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    }))
    setDataMapped(data.data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    }));
  }

  // calling the function on page load
  useEffect(() => {
    getAllData()
  }, []);

  useEffect(() =>{
    applyFilters();
  },[fromDate,toDate,search])


  // post request to create new shortUrl
  const generateShortUrl=async ()=>{
    const genShortUrl = await axios.post("https://auth-app-37.herokuapp.com/shortUrl",{
      fullUrl:fullUrl
    })
    getAllData();
    setFullUrl("");
  }

  const deleteLink = async (shortUrl)=>{
    try {
      const res = await axios.delete(`https://auth-app-37.herokuapp.com/shortUrl/${shortUrl}`)
      getAllData();
    } catch (error) {
      console.log(error);
    }
  }
  
  const applyFilters =  () =>{
    var updatedList = urlData;
    if(fromDate) {
      updatedList = updatedList.filter((item) => new Date(item.createdAt) >= new Date(fromDate));
      console.log(updatedList);
    }
    if(toDate) {
      updatedList = updatedList.filter((item) => new Date(item.createdAt) >= new Date(fromDate) && new Date(item.createdAt) <= new Date(toDate));
      console.log(updatedList);
    }

    if(search) {
      updatedList = updatedList.filter((item) => (item.fullUrl.toLowerCase().includes(search.toLowerCase()) || item.shortUrl.toLowerCase().includes(search.toLowerCase())));
      console.log(updatedList);
    }
    setDataMapped(updatedList);
  }

  const TableRow = ({url})=>{
    return (
      <tr>
        <td width="55%"><a href={url.fullUrl} className="link">{url.fullUrl}</a></td>
        <td width="25%"><a href={`/${url.shortUrl}`} className="link">{url.shortUrl}</a></td>
        <td width="10%">{url.clicks}</td>
        <td width="10%">
        {/* <button className="" > */}
        <svg className="svg_delete" onClick={()=> deleteLink(url.shortUrl)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
        {/* </button> */}
        </td>
      </tr>
    )
  }

  return (

    <div className="homeBody">
      <div className="navbar">
        <h3 >URL Shortner</h3>
        <button className="logout btn btn-outline-dark btn-sm" onClick={()=> navigate("/")}>Logout</button>
       </div>

    <div className="inputWithButton">
      <input value={fullUrl} onChange={(e)=> setFullUrl(e.target.value)} type="url" className="fullUrl my-1" placeholder="URL"/>
      <button onClick={generateShortUrl} className="shrink btn btn-primary btn-sm mx-2">Shrink</button>
    </div>

    <div className="filters my-2">
      <input type="text" className="search" onChange={(e)=> setSearch(e.target.value)} placeholder="Search Full URL"/>
      <div className="date_filter my-2">
        <input type="date" id="fromData"  onChange={(e) => setFromDate(e.target.value)} className="fromDate" />
        <input type="date" id="toDate" onChange={(e) => setToDate(e.target.value)} className="toDate" />
      </div>
    </div>
    
  
    
    <table className="table table-striped mt-3">
      <thead className="table-head">
        <tr>
          <th width="55%">Full URL</th>
          <th width="25%">Short URL</th>
          <th width="10%">Clicks</th>
          <th width="10%">Actions</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {dataMapped?.map((url,index)=>{
          return <TableRow key={index} url={url}/>
        })}
      </tbody>
    </table>
    </div>

  )
}
