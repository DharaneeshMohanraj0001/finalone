const express = require("express");
const cors = require("cors");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}


const connectDB = require("./config/db.js");

const contactRoutes = require("./routes/contactRoutes.js");



const app = express();
const PORT = process.env.PORT || 5000;


// connect database
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api", contactRoutes);


app.get("/", (req, res) => {
  res.status(200).send("Backend started successfully 🚀");
});



app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});






