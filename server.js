

const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bodyParser=require("body-parser")
const userRoutes=require("./routes/userRoutes")
const productRoutes=require("./routes/productRoutes")

const app=express()

const mongo_url =
  "mongodb+srv://deepaktecmantras:Deepak97@cluster0.dl6srrq.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongo_url)
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is connected to port 3001 and connected to MongoDb");
    });
  })
  .catch((err) => {
    console.log("Unable to connect");
  });

  app.use(bodyParser.json())
  app.use(cors())

  app.use("/api/users", userRoutes)
  app.use("/api/products", productRoutes)
  

