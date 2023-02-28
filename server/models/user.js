const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   firstname: {
       type: String,
       required: true,
       trim: true
   },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 30
    },
    picture: {
        type: String,
        default: "/default.png"

    },
    role: {
        type: [String],
        default: ["Student"],
        enum: ["Student", "Instructor","Editor", "Admin"]
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
    active: {
        type: Boolean,
        default: true
    }
},
{ timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);