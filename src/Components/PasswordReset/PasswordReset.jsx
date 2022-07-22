import "./passwordReset.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";

export default function PasswordReset() {

  const navigate= useNavigate();
  const params = useParams();
  const [showPass, setShowPass] = useState(false);
  const [password,setPassword] = useState("");
  const [reEnterPassword,setRenterPassword] = useState("");
  const [uniqueURL,setUniqueURL] = useState(params.uniqueURL);
  const [isLinkValid,setIslinkValid] = useState(true);

  useEffect(() => {
    async function checkLink(){
      try{
        const checkToken = await axios.post(`http://localhost:8080/user/checkToken/${uniqueURL}`);
        if(checkToken.data.msg==="valid"){
          setIslinkValid(true);
        }else if(checkToken.data.msg==="invalid"){
          setIslinkValid(false);
        }else if(checkToken.data.msg==="expired"){
          setIslinkValid(false);
        }
      }catch(err){
        console.log(err);
      }
      
    }
    checkLink();
  }, [uniqueURL]);

  const handleUpdatePassword =async()=>{
    try{
      await axios.put(`http://localhost:8080/user/password-reset/${uniqueURL}`,password)
    }catch(err){
      console.log(err.message);
    }
  }

  return (

    <div className="parentContainer">
      <div className="childContainer">
    {isLinkValid ? (
      <form className="loginForm p-2">
        
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input onChange={(e)=> setPassword(e.target.value)} type={showPass ? "text" : "password"} className="form-control" id="exampleInputPassword1" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Re-enter Password</label>
        <input onChange={(e)=> setRenterPassword(e.target.value)} type={showPass ? "text" : "password"} className="form-control" id="exampleInputPassword1" />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" onChange={() => setShowPass(!showPass)} className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
      </div>
      <button onClick={handleUpdatePassword} type="submit" className="btn btn-primary">SAVE</button>
    </form>
    ):(
      <div className="invalidDiv">
      <h4>Invalid link</h4>
      <button onClick={()=> navigate("/")} type="submit" className="btn btn-primary">Go to Login Page </button>
      <button onClick={()=> navigate("/verifyemail")} type="submit" className="btn btn-secondary">Verify email again</button>
      </div>
    )}
     </div>
    </div>
  )
}
