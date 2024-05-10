import React, { useState, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import './Certificate.css'
import html2pdf from 'html2pdf.js'
import { exportComponentAsPNG } from "react-component-export-image";
import axios from 'axios';

const Certificate = () => {

    const ref = useRef(null);
   const [name, setName] = useState("Your Name");
   const [email, setEmail] = useState("");
   const [CourseName, setCourseName] = useState("Course");
   const [date, setDate] = useState("01/01/2024");
   const certificateWrapper = useRef();
   const [image, setImage] = useState(null);
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || CourseName === "") return alert("Please fill out all fields");

    const pngData = await exportComponentAsPNG(ref, {
      html2CanvasOptions: { backgroundColor: null },
    });
     console.log(pngData);
    // const formData = new FormData();
    // formData.append("image", image);
    // formData.append("file", new Blob([pngData], { type: "image/png" }), "certificate.png");

  
    // const response = await fetch("http://localhost:8080/upload", {
    //   method: "POST",
    //   body: formData,
    // });
  
    // if (!response.ok) {
    //   console.log("Failed to upload file");
    // }
    // // console.log(response);
  
    // // const data = await response.json();
    // console.log("File response", response);

    // try {
    //   const response = await axios.post('http://localhost:8080/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
    //   console.log('Image uploaded:', response.data);
    // } catch (error) {
    //   console.error('Error uploading image:', error);
    // }
  };


/*
    const handleSubmit = useCallback(() => {
      if (ref.current === null) {
        return
      }
    
      toPng(ref.current, { cacheBust: true, })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = `${name}-${CourseName}-certificate.png`
          link.href = dataUrl
          link.click()
          console.log(link.href);
        })
        .catch((err) => {
          console.log(err)
        })
    }, [ref])
*/

  return (
    <div className='container'>
        <div className="aside" >
            <input type="text"  className='input-text' 
            value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter your Name'/>
            <input type="email" className='input-text'
            value={email}  onChange={(e)=> setEmail(e.target.value)}
            placeholder='Enter your email'/>
            <input type="text"  className='input-text' 
            value={CourseName} onChange={(e)=> setCourseName(e.target.value)}
            placeholder='Enter Course Name'/>
            <input type="date"  className='input-text'
            value={date} onChange={(e)=> setDate(e.target.value)} />
            <button className='btn' onClick={handleSubmit} >Download</button>
        </div>
        <div className="certificate-page"  >
        <div id='container-to-pdf' ref={ref} >
            <img className="certificate-img" src="certificate.png" />
            <div className='user-details'> 
              <h1 className='user-name'>{name}</h1>
              <p className='user-course'>For successfully completing the Tutedude {CourseName} <br/> course on {date}.</p>
        </div>
            </div>
        </div>
    </div>
  )
}

export default Certificate