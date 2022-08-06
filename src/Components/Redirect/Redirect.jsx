import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function Redirect() {

    const shortid = useParams().shortid;

    useEffect(() => {
       async function getFullUrl(){
        const urlData = await axios.get(`https://auth-app-37.herokuapp.com/shortUrl/${shortid}`);

        if(urlData.data.data.fullUrl.includes("https://")){
          window.location.replace(`${urlData.data.data.fullUrl}`)
        }else{
          window.location.replace(`https://${urlData.data.data.fullUrl}`);
        } 
        console.log(urlData.data.data.fullUrl);
       }
      getFullUrl();
    }, []);

  return (
    <>
    <div>You will get re-directed...</div>
    </>
  )
}
