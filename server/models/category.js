const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: String,
    description: String,
    active: Boolean,
});

module.exports = mongoose.model("Category", CategorySchema);
