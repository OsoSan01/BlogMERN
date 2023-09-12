const express = require('express');
const { 
    getAllUsers, 
    registerController, 
    loginController 
} = require('../controllers/userController'); //requiring all controllers, different way.
const router = express.Router();

//GET request to see all users
router.get("/all-users", getAllUsers); //calling the controller with it's appropiate request type
//POST request, create user
router.post('/register', registerController);
//POST request login
router.post("/login", loginController) //REMEMBER THAT ROUTES DO NOT HAVE F...N "." AT THE BEGGINING 

module.exports = router;
