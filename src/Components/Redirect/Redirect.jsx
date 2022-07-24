import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function Redirect() {

    const shortid = useParams().shortid;

    useEffect(() => {
       async function getFullUrl(){
        const urlData = await axios.get(`https://auth-app-37.herokuapp.com/shortUrl/${shortid}`);
        window.location.replace(`https://${urlData.data.data}`)
       }
      getFullUrl();
    }, []);

  return (
    <>
    <div>You will get re-directed...</div>
    </>
  )
}
