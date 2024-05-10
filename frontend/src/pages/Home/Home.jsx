import React from 'react'
import './Home.css'
import {useNavigate} from 'react-router-dom'

const Home = () => {

   const navigate = useNavigate();

   const generateCertificate = ()=>{
       navigate('/certificate-generate');
   }

  return (
    <div className="cards">
    <div id="card">
    <h2>Create New Certificate</h2>
    <button id="addfrn" onClick={generateCertificate} >Generate</button>
  </div>
  <div id="card">
    <h2>Manage Certificate</h2>
    <button id="addfrn">Get</button>
  </div>
  
    </div>

  )
}

export default Home