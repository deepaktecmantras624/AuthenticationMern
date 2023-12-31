import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createProduct } from "../../redux/productSlice";

const AddAdminProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //  console.log("🚀 ~ file: AddAdminProduct.jsx:13 ~ AddAdminProduct ~ imageUrl:", imageUrl)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.app.product);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpload().then((imageUrl) => {
      console.log(
        "🚀 ~ file: AddAdminProduct.jsx:13 ~ AddAdminProduct ~aaaaaa:",
        imageUrl
      );
      dispatch(createProduct({ title, description, price, imageUrl }));
      console.log(
        "🚀 ~ file: AddAdminProduct.jsx:21 ~ handleSubmit ~ title, description, price, image:",
        title,
        description,
        price,
        imageUrl
      );
      navigate("/");
    });
  };

  const handleUpload = async () => {
    if (file) {
      try {
        // get secure url from your server
        const response = await fetch("http://localhost:3001/s3Url");
        const { url } = await response.json();
        console.log(
          "🚀 ~ file: AddAdminProduct.jsx:39 ~ handleUpload ~ url:",
          url
        );

        const previewImageUrl = URL.createObjectURL(file);
        setPreviewImage(previewImageUrl);

        // post the image directly to the S3 bucketkhjkhjkhjkhk
        await fetch(url, {
          method: "PUT",
          body: file,
        });
        // const imageUrl = url.split('?')[0];
        // setImageUrl(imageUrl);

        // post request to your server to store any extra data
        console.log("🚀 ~ file: AddAdminProduct.jsx:62 ~ handleUpload ~ url:", url.split("?")[0])
        return url.split("?")[0];
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    } else {
      console.error("No file selected.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  return (
    <div
      className="border-solid rounded-md border-2 mt-7 bg-white p-8 w-full sm:w-96 mx-auto shadow-lg"
      // style={{ width: "30%", marginLeft: "30%" }}
    >
      <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">
        Add Product
      </h1>
      <div className="p-4 mx-auto">
        <form
          class="text-justify space-y-4 md:space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              for="name"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter Product Title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="text"
              className="block text-sm font-medium text-gray-600"
            >
              Product Description
            </label>
            <input
              type="text"
              placeholder="Enter Product Description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              for="price"
              className="block text-sm font-medium text-gray-600"
            >
              Enter Product Price
            </label>
            <input
              type="number"
              placeholder="Enter Product Price"
              name="number"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e);
                setPreviewImage(URL.createObjectURL(e.target.files[0]));
              }}
            />

            {previewImage && (
              <img src={previewImage} alt="Selected" className="w-[50px]" />
            )}
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
  );
};
export default AddAdminProduct;
