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
  console.log("🚀 ~ file: EditForm.jsx:15 ~ EditForm ~ product:", product)
  const [values, setValues] = useState({
    id: id,
    title: "",
  });
  console.log("🚀 ~ file: EditForm.jsx:19 ~ EditForm ~ values:", values);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProduct({ id, values}))
      .then(() => {
        alert("Update successful");
        navigate("/");
        dispatch(showProduct(values));
        // console.log(values);
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  useEffect(() => {
    dispatch(showProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setValues({
        id: product.id,
        title: product.title,
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
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            value={values.title}
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

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { updateProduct } from "../redux/productSlice";

// const EditForm = () => {
//   const { id } = useParams();
//   const [updateData, setUpdateData] = useState();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { product, loading } = useSelector((state) => state.app);

//   useEffect(() => {
//     if (id) {
//       const singleProduct = product.filter((e) => e.id === id);
//       setUpdateData(singleProduct[0]);
//     }
//   }, [id]);

//   const newData = (e) => {
//     setUpdateData({ ...updateData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateProduct(updateData));
//     navigate("/");
//   };
//   return (
//     <div className="w-[30%] p-4 rounded-t-md ml-[30%] mt-[10%] border border-black justify-items-center bg-slate-300 h-fit">
//       <h1 className="text-3xl font-semibold justify-center">Update Product</h1>
//       <br />
//       <form onSubmit={handleSubmit}>
//         <label text-gray-600>Title:</label>

//         <input
//           className="border border-gray-300 p-2 rounded-md w-full"
//           type="text"
//           name="title"
//           value={updateData && updateData.title}
//           onChange={newData}
//           placeholder="Title"
//         />
//         <br />
//         <button
//           className="btn mt-2 border border-spacing-2 p-2 border-black hover:bg-red-500 hover:text-white"
//           type="submit"
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditForm;
