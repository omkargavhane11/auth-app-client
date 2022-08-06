import axios from "axios";
import { mockdata } from "../../MockData";
import { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
      
    const data = [...new Set(mockdata.map((item) => item.gender))]

    return (
        <div>
           {data.map((item,index)=>{
            return <div>{item}</div>
           })}
        </div>
    );
}

export default Dashboard;
