import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  showProduct,
  showProductById,
  updateProduct,
} from "../redux/productSlice";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.app.product);
  const [values, setValues] = useState({
    id: id,
    name: "",
  });

  const handleSubmit = (e) => {
    // const token = localStorage.getItem("token");
    e.preventDefault();
    // axios
    //   .put("http://localhost:3001/api/products/" + id, values, {
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("Update Successful");
    //     alert("Update Successful")
    //     navigate("/");
    //   })
    //   .catch((err) => console.log(err));
    dispatch(updateProduct({ id, values })).then(() => {
      alert("Update successful");
      navigate("/");
      dispatch(showProduct(values));
      console.log(values);
    })
    .catch((error)=>{
      console.error("Update error:", error);
    })
  };

  useEffect(() => {
    dispatch(showProductById(id));
    // console.log("Product by id:", dispatch(showProductById(id)));
    // console.log("id:", id);
    // setValues(id);
    // dispatch(showProduct(values))
  }, [id,dispatch]);

  useEffect(() => {
    if (product) {
      setValues({
        id: product.id,
        name: product.title,
      });
    }
  }, [product]);

  return (
    <>
      <div className="w-[30%] p-4 rounded-t-md ml-[30%] mt-[10%] border border-black justify-items-center bg-slate-300 h-fit">
        <h1 className="text-3xl font-semibold justify-center">
          Update Product
        </h1>
        <br />
        <form onSubmit={handleSubmit}>
          <label text-gray-600>Title:</label>

          <input
            className="border border-gray-300 p-2 rounded-md w-full"
            type="text"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            value={values.name}
            placeholder="Title"
          />
          <br />
          <button
            className="btn mt-2 border border-spacing-2 p-2 border-black hover:bg-red-500 hover:text-white"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditForm;
