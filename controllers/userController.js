const bcrypt = require('bcrypt');
const User = require('../models/user');

// const jwt = require('jsonwebtoken');


//with the above way, all the controllers are self exported. No module.exports required.


//create a user
exports.registerController = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        //validation, if any field is missing there will be a bad request and it will fail
        if (!name || !email || !password) {
          return res.status(400).send({
            success: false,
            message: "Please Fill all fields",
          });
        }
        //checking if there is an existing user 
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
          return res.status(401).send({
            success: false,
            message: "user already exisits",
          });
        }
        // //hashing password with 10 salt rounds
        const hashedPassword = await bcrypt.hash(password, 10);

          //save new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).send({
          success: true,
          message: "New User Created",
          newUser,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          message: "Error In Register",
          success: false,
          error,
        });
      }
    };
    
//get all users
exports.getAllUsers = async(req, res) => {
    try{
        const users = await User.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "all users data",
            users,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Error In Get ALl Users",
          error,
        });
      }
    };

//Retrieven all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).send({
        userCount: users.length,
        success: true,
        message: "all users data",
        users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Get ALl Users",
        error,
      });
    }
  };

//login 
exports.loginController = async(req, res) => {
    try{
        //what is inside body(object)
        const { email, password } = req.body
        //validation, need to give/input both elements in order to proceed
        if(!email || !password) {
            return res.status(401).send({
                succes: false,
                message: "Please Fill all Parameters"
            });
        }
        //finding a match by email, if not, system will say there is not user registered
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(200).send({ 
                succes: false,
                message: "Email Not Registered"
            });
        }


        //password de-hashing
        const isMatch= await bcrypt.compare(password, user.password)
        if(!isMatch)
            return res.status(401).send({
                succes: false,
                message: "Invalid Username or Password"
            });

        return res.status(200).send({
            succes: true,
            message: "Loging successfu. Welcome Back",
            user,
        });

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In Login",
            error
        })
    };

};