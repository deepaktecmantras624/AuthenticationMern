import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, showProduct } from "../../redux/productSlice";
import { Link, useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.app.product);
  const loading = useSelector((state) => state.app.loading);
  console.log(
    "🚀 ~ file: AdminDashboard.jsx:8 ~ AdminDashboard ~ product:",
    product
  );

  useEffect(() => {
    dispatch(showProduct());
  }, [dispatch]);

  if (loading) {
    return <p className="text-4xl text-center">...Loading</p>;
  }
  console.log("Products is coming or not", product);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .then((res) => {
        if (res.data) {
          window.confirm("Are you sure to delete");
        }
        dispatch(showProduct(product));
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <>
      <div className="flex space-x-4 justify-evenly ml-7">
        <div>
          <p className="text-5xl tracking-wide uppercase font-bold mx-center  text-red-400">
            Dashboard
          </p>
        </div>
      </div>
      <div className="mt-[45px] ml-[76%]">
        <Link
          className="p-3  bg-[#2699fb] text-white hover:bg-teal-600  border-spacing-1 border-black"
          to="/addproduct"
        >
          Add Product
        </Link>
      </div>

      <div className="w-4/5 mx-auto mt-8 overflow-x-auto md:overflow-hidden">
        <p className="text-2xl font-bold from-stone-700 underline">
          Product list
        </p>
        <br />

        <div className="justify-center items-center h-screen">
          <div className="bg-gray-100 p-8 rounded-lg">
            <table className="table-auto w-full md:table-fixed">
              <thead>
                <tr>
                  <th className="text-right">S.No.</th>
                  <th className="text-right">Title</th>
                  <th className="text-right">Description</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {product &&
                  product.map((p, index) => {
                    return (
                      <tr key={p.index}>
                        <td className="text-right">{index + 1}.</td>
                        <td className="text-right">{p.title}</td>
                        <td className="text-right">{p.description}</td>
                        <td className="text-right">{p.price}</td>
                        <td className="text-right">
                          <div className="gap-3">
                            <Link
                              to={`/update/${p._id}`}
                              className="p-2 border mr-2 hover:rounded-lg bg-amber-400  text-black"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => handleDelete(p._id)}
                              className="border hover:rounded-lg bg-red-600 p-2 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
