import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: id,
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:3001/api/users/'+id, values)
      .then((res) => {
        console.log("Update Successful");
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/register/" + id)
      .then((res) => {
        setValues({ ...values, name: res.data.name });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <div className="w-[30%] p-4 rounded-t-md ml-[30%] mt-[10%] border border-black justify-items-center bg-slate-300 h-fit">
      <h1 className="text-3xl font-semibold justify-center">Update User</h1>
      <br />
      <form  onSubmit={handleSubmit}>
        <label text-gray-600>Name:</label>
        
        <input
        className="border border-gray-300 p-2 rounded-md w-full"
          type="text"
          name="name"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          value={values.name}
          placeholder="Name"
          />
          <br />
        <button className="btn mt-2 border border-spacing-2 p-2 border-black hover:bg-red-500 hover:text-white" type="submit">Update</button>
      </form>
    </div>
          </>
  );
};

export default EditForm;
