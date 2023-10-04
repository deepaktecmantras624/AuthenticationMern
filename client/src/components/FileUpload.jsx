import axios from "axios";
import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    console.log(e.target.value);
    setFile(e.target.value);
  };

  const handleSubmit=(e)=>{
const formdata=new FormData()
formdata.append('file', file)
axios.post(`http://localhost:3001/upload`, formdata)
.then(res=>console.log(res))
.catch(err=>console.log(err))
  }
  return (
    <div>
      <h1>File Uploading</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={onFileChange} />
        <button
          class="bg-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
          type="submit"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
