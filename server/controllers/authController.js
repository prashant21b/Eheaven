const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchemas');
const Cart = require('../models/cartSchemas');

exports.singup = async (req, res) => {
    try {
        const { name, email, password, confirmedPassword } = req.body;
        console.log(req.body);
        if (!name || !email || !password ||!confirmedPassword) {
            return res.status(400).json({
                sucess: false,
                message: "All field is required",
            })

        }
        if (password !== confirmedPassword) {
            return res.status(400).json({
                sucess: false,
                message: 'password and confirmed password not matched',
            })
        }
        const isUserExit = await User.findOne({ email });
        if (isUserExit) {
            return res.status(404).json({
                sucess: false,
                message: 'Email is already registered',
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashPassword,
        }).save();
        return res.status(200).json({
            sucess: true,
            message: 'User registered sucessfully',
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: 'Internal server error',
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email) {
            return res.status(400).json({
                sucess: false,
                message: 'email is required',
            })
        }
        if (!password) {
            return res.status(400).json({
                sucess: false,
                message: 'password is required',
            })
        }
        const isUserExit = await User.findOne({email});
        if (!isUserExit) {
            return res.status(404).json({
                sucess: false,
                message: 'Email is not registered',
            })
        }

        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, isUserExit.password)){
            const token = jwt.sign(
                { email: isUserExit.email, id: isUserExit._id,name:isUserExit.name,accountType:isUserExit.accountType},
                process.env.JWT_SECRET,
                {
                
                expiresIn: "24h",
                
                }
            )
            // Save token to user document in database
            isUserExit.token = token
            isUserExit.password = undefined
            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
           return  res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                isUserExit,
                message: `User Login Success`,
            })
        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        })
    }
}

//edit profile

exports.editProfile = async (req, res) => {
    try {
        const { id, name, email } = req.body;
        const user = await User.findById(id);
  console.log(req.body);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.name = name;
        user.email = email;
        await user.save();
        res.status(200).json({ sucess:true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'An error occurred while updating the profile' });
    }
};

