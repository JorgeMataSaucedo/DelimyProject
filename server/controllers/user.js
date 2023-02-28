const User = require('../models/user');
const bcrypt = require('bcrypt');
const image = require('../utils/image');
const getMe = async (req, res) => {
    const {user_id} = req.user;
    const response = await User.findById(user_id).select('-password');
    if(!response) {
        return res.status(404).json({message: 'User not found'});
    } else {
        return res.status(200).json({user: response});
    }
    res.status(200).send('User');
}

const getUsers = async (req, res) => {
    const {user_id} = req.user;
    const {active} = req.query;
    let response = null;
    User.findById(user_id, (err, user) => {
        if(user.role[0] !== "Admin"){
            return res.status(403).send({msg: "You are not authorized to perform this action"});
        }
        if (err) {
            res.status(500).send({msg: "SEVER ERROR"});
        }
    });
    if(active === undefined){
        response = await User.find().select('-password');
    } else {
        response = await User.find({active: active}).select('-password');
    }
    if(!response) {
        return res.status(404).json({message: 'Users not found'});
    }

    return res.status(200).json({users: response});


};




const createUser = async (req, res) => {
    const {firstname, lastname, email, password } = req.body;
    if (!firstname) return res.status(400).send("First name is required");
    if (!lastname) return res.status(400).send("Last name is required");
    if (!email) return res.status(400).send("Email is required");
    if (!password || password.length < 6) return res.status(400).send("Password is required and should be min 8 characters long");

    let userExist = await User.findOne({email: email.toLowerCase()});
    if (userExist) return res.status(400).send("Email is taken");
    const user = new User({ ...req.body, active: true });
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    user.password = hashpassword;

    if (req.files.picture) {
        const imagePath = req.files.picture.path.replace(/\\/g, '/');
        const imagePathWithoutUploads = imagePath.substring('uploads'.length + 1);
        user.picture = imagePathWithoutUploads;
        console.log(imagePathWithoutUploads);
    }

    user.save((err, userStore) => {
        if (err) {
            res.status(500).send({ msg: "SERVER ERROR" });
        } else {
            if (!userStore) {
                res.status(404).send({ msg: "User not found" });
            } else {
                res.status(200).send({ user: userStore });
            }
        }
    });
};


module.exports = {
    getMe,
    getUsers,
    createUser
}
