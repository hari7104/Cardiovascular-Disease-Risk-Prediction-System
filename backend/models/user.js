const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 120,
    },
});

module.exports = mongoose.model("User", userSchema);