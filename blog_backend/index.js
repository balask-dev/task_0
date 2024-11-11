const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
let cors=require("cors");
dotenv.config();

app.use(express.json());
app.use(cors())
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true},()=> console.log("Connected"))

const storage = multer.diskStorage({
  destination: (req, file, data) => {data(null, "images")},filename: (req, file, data) => {
    data(null, req.body.name)}});
    
const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).send("File uploaded")});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/categories",categoryRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT, () => {
  console.log("Connected");
});
