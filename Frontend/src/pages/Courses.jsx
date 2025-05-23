import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Courses() {
  let [Courses, setCourses] = useState([])

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) {
      return;
    }
    async function GetData() {
      try {
        let res = await axios.get("http://localhost:5500/api/courses", {
          headers: {
            'Authorization': token
          }
        })
        console.log(res.data);
        setCourses(res.data) 
      }
      catch (err) {
        console.log({ message: err.message });
      }
    }
    GetData()
  }, [])
 
  return (
    <div >
      <center>
        <h1>Courses</h1>
        {
          Courses.map((e, index) => (
            <div key={index}>
              <h3>{e.name}</h3>
            </div>
          ))
        }
      </center>
    </div>
  )
}
