
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/auth');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');
const image = require('../utils/image');
const jwtk = require('jsonwebtoken');
require("dotenv").config();





const register = async (req, res) => {
    try{
    const {firstname, lastname, email, password, role} = req.body;
    if (!firstname) return res.status(400).send("First name is required");
    if (!lastname) return res.status(400).send("Last name is required");
    if (!email) return res.status(400).send("Email is required");
    if (!password || password.length < 6) return res.status(400).send("Password is required and should be min 8 characters long");

    let userExist = await User.findOne({email: email.toLowerCase()});
    if (userExist) return res.status(400).send("Email is taken");

    const hashedPassword = await hashPassword(password);

        const user = new User(
            {
                firstname,
                lastname,
                email: email.toLowerCase(),
                password: hashedPassword,
                role

            }
        );

        if (req.files.picture) {
            const imagePath = req.files.picture.path.replace(/\\/g, '/');
            const imagePathWithoutUploads = imagePath.substring('uploads'.length + 1);
            user.picture = imagePathWithoutUploads;
            console.log(imagePathWithoutUploads);
        }

        await user.save();
        console.log("REGISTERED SUCCESSFULLY");
        console.log(user);
        return res.json({ok: true});
} catch (err){
    console.log("REGISTER ERROR", err);
    return res.status(400).send("Error. Try again.");
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
        if (!password) return res.status(400).send({ msg: "La contraseña es obligatoria" });

        const emailLowerCase = email.toLowerCase();

        User.findOne({ email: emailLowerCase }, (error, userStore) => {
            if (error) {
                return res.status(500).send({ msg: "SEVER ERROR" });
            } else if (!userStore) {
                return res.status(404).send({ msg: "Usuario no encontrado" });
            } else {
                bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                    if (bcryptError) {
                        return res.status(500).send({ msg: "SEVER ERROR" });
                    } else if (!check) {
                        return res.status(400).send({ msg: "Incorrect password" });
                    } else if (!userStore.active) {
                        return res.status(401).send({ msg: "The user is not authorized or is not active" });
                    } else {
                        return res.status(200).send({
                            access: jwt.createAccessToken(userStore),
                            refresh: jwt.createRefreshToken(userStore),
                        });
                    }
                });
            }
        });
    } catch (err) {
        console.log("LOGIN ERROrR", err);
        return res.status(400).send("Error. Try again.");
    }
};

const loginB = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email: email.toLowerCase()}).exec();

        if(!user) return res.status(400).send("User not found");

        const match = await comparePassword(password, user.password);

        const token = jwtk.sign({_id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'});

        user.password = undefined;

        res.cookie('token', token, {
            httpOnly: true,
            //secure: true,
        });

        res.json({
            token,
            user

        });



    } catch (err){
        console.log("LOGIN ERROR", err);
        return res.status(400).send("Error. Try again.");
    }

}

const logout = async (req, res) => {
    try{
        res.clearCookie('token');
        res.json({
            message: "Logout success"
        });
    } catch (err){
        console.log("LOGOUT ERROR", err);
    }
};


const currentUser = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password').exec();
        console.log("CURRENT USER", user);
       return  res.json({
            ok: true,
            user
        });
    } catch (err){
        console.log("CURRENT USER ERROR", err);
    }
};


const refreshToken = async (req, res) => {
    const {token} = req.body;

    if(!token) return res.status(400).send({msg: "Token is required"});

    const {user_id} = jwt.decodeToken(token);

    User.findOne({_id: user_id}, (error, userStore) => {
        if (error) {
            res.status(500).send({msg: "SEVER ERROR"});
        } else {
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStore),
            });
        }
    });




}

module.exports = {
    register,
    login,
    refreshToken,
    loginB,
    logout,
    currentUser
}