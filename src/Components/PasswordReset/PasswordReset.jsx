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
  const [passAlert,setPassAlert] = useState(false);
  const [isPasswordUpdate,setIsPasswordUpdated] = useState(false);

  useEffect(() => {
    async function checkLink(){
      try{
        const checkToken = await axios.post(`https://auth-app-37.herokuapp.com/user/checkToken/${uniqueURL}`);
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

  const handleUpdatePassword =async(e)=>{
    e.preventDefault();
    try{
      if(password===reEnterPassword){
        const update = await axios.put(`https://auth-app-37.herokuapp.com/user/password-reset/${uniqueURL}`,{
          password:password
        })
        if(update.data.msg === "password updated successfully"){
          setIsPasswordUpdated(true)
        }
      }else{
        setPassAlert(true);
      }
    }catch(err){
      console.log(err.message);
    }
  }

  return (

    <div className="parentContainer">
      <div className="childContainer">
        {!isPasswordUpdate? (
    isLinkValid ? (
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
      {passAlert?<span className="alert">Password do not match</span>:""}
      <button onClick={handleUpdatePassword} type="submit" className="btn btn-primary">SAVE</button>
    </form>)
    :(
      <div className="invalidDiv">
      <h4>Invalid link 😱</h4>
      <button onClick={()=> navigate("/")} type="submit" className="btn btn-primary">Go to Login Page </button>
      <button onClick={()=> navigate("/verifyemail")} type="submit" className="btn btn-secondary">Verify email again</button>
      </div>
    )):(
      <div className="validDiv">
      <h4>Password updated Successfully ! 😎👍</h4>
      <span>Please</span>
      <button onClick={()=> navigate("/")} type="submit" className="loginbtn btn btn-primary">Login</button>
      {/* <button onClick={()=> navigate("/verifyemail")} type="submit" className="btn btn-secondary">to enter the app</button> */}
      <span>to enter the app</span>
      </div>
    )}
     </div>
    </div>
  )
}
