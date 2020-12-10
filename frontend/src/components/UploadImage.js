import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../firebase/Auth'

function UploadImage() {
    const { currentUser } = useContext(AuthContext)

    const [selectedFile, setSelectedFile] = useState(null)
    
    const fileSelectHandler = (e) =>{
      console.log(e.target.files[0])
      setSelectedFile(e.target.files[0])
    }

    const fileUploadHandler = async () =>{
      try{
      let formData = new FormData();
      formData.append('image', selectedFile, selectedFile.name);
      const upload = await axios.post(`http://localhost:3000/api/user/photo/${currentUser.uid}`, formData,
        { headers: 
          {
          'Content-Type': 'multipart/form-data'
          }
        });
      console.log(upload)
      } catch(e) {
        console.log(e)
      }
    }

    return (
      <div>
        <input type="file" onChange={fileSelectHandler} />
        <button onClick = {fileUploadHandler}>Upload</button>
      </div>

    )
  
}

export default UploadImage
