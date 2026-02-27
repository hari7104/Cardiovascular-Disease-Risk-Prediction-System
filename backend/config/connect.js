const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("MONGO_URI is not defined in environment variables.");
        return;
    } else {
        const cnn = mongoose.connect(uri);
        cnn.then(() => {
            console.log("Connected to MongoDB");
        }).catch((err) => {
            console.log("Error connecting to MongoDB:", err);
        });

    }
}

