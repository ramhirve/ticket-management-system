
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const ticketRoute = require("./routes/ticket.routes.js")
const userRoute = require("./routes/user.routes.js")

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI

const connectDb = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
}
connectDb();



app.use("/api/v1/ticket", ticketRoute)
app.use("/api/v1/user", userRoute)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));