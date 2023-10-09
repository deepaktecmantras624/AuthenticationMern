import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createProduct } from '../../redux/productSlice';

const AddAdminProduct = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {product}=useSelector((state)=>state.app)
  
    const handleSubmit = (e) => {
      e.preventDefault()
      
      dispatch(createProduct({title,description,price}))
      
      console.log("Checking addAdmin Product",product);
      alert("Product Added  Successful")
      navigate("/")
      
    };
  return (
    <div
    className="border-solid rounded-md border-2 mt-7 bg-grey bg-slate-50"
    style={{ width: "30%", marginLeft: "30%" }}
  >
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
      Add Product
    </h1>
    <div  className="p-4">
      <form class="text-justify space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter Product Title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            class="w-full"
          />
        </div>

        <div>
          <label
            for="text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Description
          </label>
          <input
            type="text"
            placeholder="Enter Product Description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            class="w-full"
          />
        </div>
        <div>
          <label
            for="price"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Product Price
          </label>
          <input
            type="number"
            placeholder="Enter Product Price"
            name="number"
            onChange={(e) => setPrice(e.target.value)}
            class="w-full"
          />
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add Product
        </button>

      </form>
    </div>
  </div>
  )
}

export default AddAdminProduct
