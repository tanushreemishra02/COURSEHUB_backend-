const express=require('express');
const dotenv=require('dotenv').config();
const cors=require('cors');
let connection = require ('./config/db');
const authRoutes = require("./routes/authRoutes");
const courseRoutes=require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
 connection();


const app = express();

app.use(cors());
app.use(express.json());

const port=process.env.PORT;

app.get("/", (req, res) => {
  res.send("🚀 CourseHub Backend is Running Successfully");
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port,()=>{
    console.log(`the server is running on port  ${port}`)
    
})


 